# frozen_string_literal: true

# Contains logic for calculating user metrics
class MetricsCalculator
  class << self
    def call(user)
      metric = user.metric

      active_friends, inactive_friends = active_friends(user)
      user.set_active(true, active_friends)
      user.set_active(false, inactive_friends)

      metric.average_likes = average_likes(user)
      metric.target_likes = target_likes(user)

      metric.average_comments = average_comments(user)
      metric.target_comments = target_comments(user)

      metric.comments_likes_ratio = comments_likes_ratio(user)
      metric.target_comments_likes_ratio = target_comments_likes_ratio(user)

      metric.average_engagement_rate = average_engagement_rate(user)
      metric.audience_score = audience_score(user)

      metric.save
    end

    private

    # Computes set of active and inactive friends' vk uids
    # based on activity (likes and comments) on posts
    def active_friends(user)
      vk_uids = user.posts.flat_map do |post|
        post.likes + post.comments
      end.uniq

      active_users = user.friends.where(vk_uid: vk_uids).to_set
      friends = user.friends.to_set

      active_friends = active_users & friends
      inactive_friends = friends - active_friends
      [active_friends, inactive_friends]
    end

    # Computes average number of likes per post
    def average_likes(user)
      return 0 if user.posts.empty?

      (user.total_likes.to_f / user.posts.size).round
    end

    # Computes target number of likes based on `target_likes_ratio`
    # Target number - theoretically possible with the current
    # number of followers
    def target_likes(user, target_likes_ratio: 0.3)
      (user.friends.size * target_likes_ratio).round
    end

    # Computes average number of comments per post
    def average_comments(user)
      return 0 if user.posts.empty?

      (user.total_comments.to_f / user.posts.size).round
    end

    # Computes target number of comments based on `target_comments_ratio`
    # Target number - theoretically possible with the current
    # number of followers
    def target_comments(user, target_comments_ratio: 0.1)
      (user.friends.size * target_comments_ratio).round
    end

    # Computes ratio of total comments to total likes
    def comments_likes_ratio(user)
      total_activity = user.total_comments + user.total_likes
      return 0 if total_activity.zero?

      (user.total_comments.to_f / total_activity * 100).round
    end

    # Computes target ratio of total comments to total likes
    # Target number - theoretically possible with the current
    # number of followers
    def target_comments_likes_ratio(
      user,
      target_likes_ratio: 0.3,
      target_comments_ratio: 0.1
    )
      target_total_comments = (user.total_comments * target_comments_ratio).round
      target_total_likes = (user.total_likes * target_likes_ratio).round
      target_total_activity = target_total_comments + target_total_likes
      return 0 if target_total_activity.zero?

      (target_total_comments.to_f / target_total_activity * 100).round
    end

    # Calculates engagement rate for a single post
    # Engagement rate - average activity shown by each user
    def engagement_rate(post)
      return 0 if post.user.friends.empty?

      engagement_rate = ((post.likes.size + post.comments.size).to_f / post.user.friends.size * 100).round
      [engagement_rate, 100].min
    end

    # Computes average engagement rate of posts
    def average_engagement_rate(user)
      return 0 if user.posts.empty?

      user.posts.each do |post|
        post.engagement_rate = engagement_rate(post)
        post.save
      end

      total_engagement_rate = user.posts.sum(&:engagement_rate)
      (total_engagement_rate / user.posts.size).round
    end

    # Computes audience score based on the ratio of active friends
    # to total friends
    # The score is scaled to a range of 0.0 to 10.0
    def audience_score(user)
      return 0.0 if user.friends.empty?

      (user.active_relationships.count.to_f / user.friends.size * 10).round(1)
    end
  end
end

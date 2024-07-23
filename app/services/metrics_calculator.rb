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

      metric.average_engagement_score = average_engagement_score(user)
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
    # in the form "comments:likes"
    def comments_likes_ratio(user)
      common_divisor = user.total_comments.gcd(user.total_likes)
      return '0:0' if common_divisor.zero?

      "#{user.total_comments / common_divisor}:#{user.total_likes / common_divisor}"
    end

    # Computes target ratio of total comments to total likes
    # in the form "comments:likes"
    # Target number - theoretically possible with the current
    # number of followers
    def target_comments_likes_ratio(
      user,
      target_likes_ratio: 0.3,
      target_comments_ratio: 0.1
    )
      target_comments = (user.total_comments * target_comments_ratio).round
      target_likes = (user.total_likes * target_likes_ratio).round

      common_divisor = target_comments.gcd(target_likes)
      return '0:0' if common_divisor.zero?

      "#{target_comments / common_divisor}:#{target_likes / common_divisor}"
    end

    # Calculates engagement score for a single post
    # Engagement score - average activity shown by each user
    def engagement_score(post, engagement_score_factor: 100)
      return 0 if post.user.friends.empty?

      ((post.likes.size + post.comments.size).to_f / post.user.friends.size * engagement_score_factor).round
    end

    # Computes average engagement score of posts
    def average_engagement_score(user)
      return 0 if user.posts.empty?

      user.posts.each do |post|
        post.engagement_score = engagement_score(post)
        post.save
      end

      total_engagement_score = user.posts.sum(&:engagement_score)
      (total_engagement_score / user.posts.size).round
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

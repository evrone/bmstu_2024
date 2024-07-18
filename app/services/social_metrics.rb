# frozen_string_literal: true

# Contains logic for calculating user metrics
module SocialMetrics
  # Contains data for calculating user metrics
  class Context
    attr_reader :posts,
                :friends,
                :total_likes,
                :total_comments,
                :target_likes_ratio,
                :target_comments_ratio,
                :engagement_score_factor

    def initialize(
      posts,
      friends,
      target_likes_ratio      = 0.3,
      target_comments_ratio   = 0.1,
      engagement_score_factor = 1000
    )
      @posts = posts
      @friends = friends

      @total_likes = @posts.sum { |post| post[:likes].size }
      @total_comments = @posts.sum { |post| post[:comments].size }

      @target_likes_ratio = target_likes_ratio
      @target_comments_ratio = target_comments_ratio
      @engagement_score_factor = engagement_score_factor
    end
  end

  # Calculates engagement score for a single post
  # Engagement score - average activity shown by each user
  def self.engagement_score(ctx, post)
    return 0 if ctx.friends.empty?

    ((post[:likes].size + post[:comments].size).to_f / ctx.friends.size * ctx.engagement_score_factor).round
  end

  # Computes some metrics for each post
  def self.post_metrics(ctx)
    ctx.posts.map do |post|
      {
        post_id: post[:id],
        likes_count: post[:likes].size,
        comments_count: post[:comments].size,
        engagement_score: engagement_score(ctx, post)
      }
    end
  end

  def self.average_engagement_score(post_metrics)
    return 0 if post_metrics.empty?

    total_engagement_score = post_metrics.sum do |metrics|
      metrics[:engagement_score]
    end

    (total_engagement_score / post_metrics.size).round
  end

  # Computes set of active and inactive friends
  # based on activity (likes and comments) on posts
  def self.active_friends(ctx)
    active_friends_set = ctx.posts.flat_map do |post|
      post[:likes] + post[:comments]
    end.uniq
    active_friends = active_friends_set & ctx.friends
    inactive_friends = ctx.friends - active_friends
    [active_friends, inactive_friends]
  end

  # Computes average number of likes per post
  def self.average_likes(ctx)
    return 0 if ctx.posts.empty?

    (ctx.total_likes.to_f / ctx.posts.size).round
  end

  # Computes target number of likes based on `target_likes_ratio`
  # Target number - theoretically possible with the current
  # number of followers
  def self.target_likes(ctx)
    (ctx.friends.size * ctx.target_likes_ratio).round
  end

  # Computes average number of comments per post
  def self.average_comments(ctx)
    return 0 if ctx.posts.empty?

    (ctx.total_comments.to_f / ctx.posts.size).round
  end

  # Computes target number of comments based on `target_comments_ratio`
  # Target number - theoretically possible with the current
  # number of followers
  def self.target_comments(ctx)
    (ctx.friends.size * ctx.target_comments_ratio).round
  end

  # Computes ratio of total comments to total likes
  # in the form "comments:likes"
  def self.comments_likes_ratio(ctx)
    common_divisor = ctx.total_comments.gcd(ctx.total_likes)
    return '0:0' if common_divisor.zero?

    "#{ctx.total_comments / common_divisor}:#{ctx.total_likes / common_divisor}"
  end

  # Computes target ratio of total comments to total likes
  # in the form "comments:likes"
  # Target number - theoretically possible with the current
  # number of followers
  def self.target_comments_likes_ratio(ctx)
    target_comments = (ctx.total_comments * ctx.target_comments_ratio).round
    target_likes = (ctx.total_likes * ctx.target_likes_ratio).round

    common_divisor = target_comments.gcd(target_likes)
    return '0:0' if common_divisor.zero?

    "#{target_comments / common_divisor}:#{target_likes / common_divisor}"
  end

  # Computes audience score based on the ratio of active friends
  # to total friends
  # The score is scaled to a range of 0.0 to 10.0
  def self.audience_score(ctx, active_friends)
    return 0.0 if ctx.friends.empty?

    (active_friends.size.to_f / ctx.friends.size * 10).round(1)
  end
end

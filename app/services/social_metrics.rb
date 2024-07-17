class SocialMetrics
  attr_reader :post_metrics,
              :active_friends,
              :inactive_friends,
              :average_likes,
              :target_likes,
              :average_comments,
              :target_comments

  TARGET_LIKES_RATIO = 0.3        # % of friends who like
  TARGET_COMMENTS_RATIO = 0.1     # % of friends who comment
  ENGAGEMENT_SCORE_FACTOR = 1000  # score sensitivity

  def initialize(posts, friends)
    @posts = posts
    @friends = friends

    @total_likes = @posts.sum { |post| post[:likes].size }
    @total_comments = @posts.sum { |post| post[:comments].size }

    compute_post_metrics
    compute_common_metrics
  end

  private

  # Calculates engagement score for a single post
  # Engagement score - average activity shown by each user
  def get_engagement_score(post)
    return 0 if @friends.empty?
    ((post[:likes].size + post[:comments].size).to_f / @friends.size * ENGAGEMENT_SCORE_FACTOR).round
  end

  # Computes some metrics for each post
  def compute_post_metrics
    @post_metrics = @posts.map do |post|
      {
        post_id: post[:id],
        likes_count: post[:likes].size,
        comments_count: post[:comments].size,
        engagement_score: get_engagement_score(post)
      }
    end
  end

  # Computes common metrics for the class
  def compute_common_metrics
    compute_active_friends
    compute_average_likes
    compute_target_likes
    compute_average_comments
    compute_target_comments
  end

  # Computes set of active and inactive friends
  # based on activity (likes and comments) on posts
  def compute_active_friends
    active_friends_set = @posts.flat_map { |post|
      post[:likes] + post[:comments]
    }.uniq
    @active_friends = active_friends_set & @friends
    @inactive_friends = @friends - @active_friends
  end

  # Computes average number of likes per post
  def compute_average_likes
    if @posts.empty?
      @average_likes = 0
      return
    end

    @average_likes = (@total_likes.to_f / @posts.size).round
  end

  # Computes target number of likes based on TARGET_LIKES_RATIO
  # Target number - theoretically possible with the current
  # number of followers
  def compute_target_likes
    @target_likes = (@friends.size * TARGET_LIKES_RATIO).round
  end

  # Computes average number of comments per post
  def compute_average_comments
    if @posts.empty?
      @average_comments = 0
      return
    end

    @average_comments = (@total_comments.to_f / @posts.size).round
  end

  # Computes target number of comments based on TARGET_COMMENTS_RATIO
  # Target number - theoretically possible with the current
  # number of followers
  def compute_target_comments
    @target_comments = (@friends.size * TARGET_COMMENTS_RATIO).round
  end
end

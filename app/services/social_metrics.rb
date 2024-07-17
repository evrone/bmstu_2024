class SocialMetrics
  attr_reader :post_metrics,
              :active_friends,
              :inactive_friends,
              :average_likes,
              :target_likes,
              :average_comments,
              :target_comments,
              :comments_likes_ratio,
              :target_comments_likes_ratio,
              :audience_score

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
    compute_comments_likes_ratio
    compute_target_comments_likes_ratio
    compute_audience_score
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

  # Computes ratio of total comments to total likes
  # in the form "comments:likes"
  def compute_comments_likes_ratio
    common_divisor = @total_comments.gcd(@total_likes)
    if common_divisor.zero?
      @comments_likes_ratio = '0:0'
    else
      @comments_likes_ratio = "#{@total_comments / common_divisor}:#{@total_likes / common_divisor}"
    end
  end

  # Computes target ratio of total comments to total likes
  # in the form "comments:likes"
  # Target number - theoretically possible with the current
  # number of followers
  def compute_target_comments_likes_ratio
    target_comments = (@total_comments * TARGET_COMMENTS_RATIO).round
    target_likes = (@total_likes * TARGET_LIKES_RATIO).round
    common_divisor = target_comments.gcd(target_likes)
    if common_divisor.zero?
      @target_comments_likes_ratio = '0:0'
    else
      @target_comments_likes_ratio = "#{target_comments / common_divisor}:#{target_likes / common_divisor}"
    end
  end

  # Computes audience score based on the ratio of active friends
  # to total friends
  # The score is scaled to a range of 0.0 to 10.0
  def compute_audience_score
    if @friends.empty?
      @audience_score = 0.0
    else
      @audience_score = (@active_friends.size.to_f / @friends.size * 10).round(1)
    end
  end
end

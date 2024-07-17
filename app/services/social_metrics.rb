class SocialMetrics
  attr_reader :post_metrics

  ENGAGEMENT_SCORE_FACTOR = 1000  # score sensitivity

  def initialize(posts, friends)
    @posts = posts
    @friends = friends

    @total_likes = @posts.sum { |post| post[:likes].size }
    @total_comments = @posts.sum { |post| post[:comments].size }

    compute_post_metrics
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
end

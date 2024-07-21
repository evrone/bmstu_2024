# frozen_string_literal: true

class Metric < ApplicationRecord
  belongs_to :user

  def as_json(_options = {})
    super(only: %i[
      average_likes
      target_likes
      average_comments
      target_comments
      comments_likes_ratio
      target_comments_likes_ratio
      audience_score
      average_engagement_score
    ])
  end

  def calculate
    context = SocialMetrics::Context.new(user)

    active_friends, inactive_friends = SocialMetrics.active_friends(context)

    average_likes = SocialMetrics.average_likes(context)
    target_likes = SocialMetrics.target_likes(context)

    average_comments = SocialMetrics.average_comments(context)
    target_comments = SocialMetrics.target_comments(context)

    comments_likes_ratio = SocialMetrics.comments_likes_ratio(context)
    target_comments_likes_ratio = SocialMetrics.target_comments_likes_ratio(context)

    audience_score = SocialMetrics.audience_score(context, active_friends)

    post_metrics = SocialMetrics.post_metrics(context)
    average_engagement_score = SocialMetrics.average_engagement_score(post_metrics)

    update(
      average_likes:,
      target_likes:,
      average_comments:,
      target_comments:,
      comments_likes_ratio:,
      target_comments_likes_ratio:,
      audience_score:,
      average_engagement_score:
    )

    user.update_post_metrics(post_metrics)

    user.update_activity(true, active_friends)
    user.update_activity(false, inactive_friends)
  end
end

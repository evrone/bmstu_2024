# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :metric, dependent: :destroy

  has_many :posts
  has_many :relationships
  has_many :friends, through: :relationships

  def friends_ids
    relationships.pluck(:friend_id)
  end

  def active_friends
    relationships.where(is_active: true)
  end

  def inactive_friends
    relationships.where(is_active: false)
  end

  def update_activity(value, friend_ids)
    relationships.where(friend_id: friend_ids).update_all(is_active: value)
  end

  def posts_brief
    posts.pluck(:id, :likers, :commentators).map do |post|
      {
        id: post[0],
        likes: JSON.parse(post[1]),
        comments: JSON.parse(post[2])
      }
    end
  end

  def update_post_metrics(post_metrics)
    post_metrics.each do |post_metric|
      posts.where(id: post_metric[:post_id]).update_all(engagement_score: post_metric[:engagement_score])
    end
  end

  def update_metrics(forced: false)
    metrics_fields = %i[
      average_likes target_likes average_comments target_comments
      comments_likes_ratio target_comments_likes_ratio audience_score
      average_engagement_score
    ]

    metrics_have_nil = metrics_fields.map do |field|
      metric[field].nil?
    end.any?

    posts_have_nil = posts.map do |post|
      post.engagement_score.nil?
    end.any?

    return unless forced || metrics_have_nil || posts_have_nil

    metric.calculate
  end
end

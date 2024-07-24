# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :user_id, uniqueness: true
  devise :database_authenticatable, :rememberable

  has_one :metric, dependent: :destroy

  has_many :posts
  has_many :relationships
  has_many :friends, through: :relationships

  has_many :active_relationships, -> { where active: true }, class_name: 'Relationship'
  has_many :inactive_relationships, -> { where active: false }, class_name: 'Relationship'

  has_many :active_friends, through: :active_relationships, class_name: 'Friend', source: :friend
  has_many :inactive_friends, through: :inactive_relationships, class_name: 'Friend', source: :friend

  after_create :create_metric

  def create_metric
    Metric.create(user: self)
  end

  def total_likes
    posts.sum do |post|
      post.likes.size
    end
  end

  def total_comments
    posts.sum do |post|
      post.comments.size
    end
  end

  def set_active(value, friends)
    relationships.where(friend: friends).update_all(active: value)
  end

  def update_metrics
    MetricsCalculator.call(self)
  end

  def update_metrics_needed?
    metrics_fields = %i[
      average_likes target_likes average_comments target_comments
      comments_likes_ratio target_comments_likes_ratio audience_score
      average_engagement_score
    ]

    metrics_have_nil = metrics_fields.map { |field| metric[field].nil? }.any?
    post_metrics_have_nil = posts.map { |post| post.engagement_score.nil? }.any?

    metrics_have_nil || post_metrics_have_nil
  end



  def password_required?
    new_record? ? false : super
    false
  end

  def email_required?
    false
  end

  def self.needs_refresh_token?(user)
    Time.now > user.access_token_expiration_time
  end

  def self.user_create(userid, accesstoken, refreshtoken, deviceid, user_state)
    user = User.find_or_create_by(user_id: userid) do |u|
      u.access_token = accesstoken
      u.refresh_token = refreshtoken
      u.user_device_id = deviceid
      u.access_token_expiration_time = Time.now + 60.minutes
      u.user_state = user_state
    end
    if user.persisted?
      user.update(access_token: accesstoken, refresh_token: refreshtoken,
                  access_token_expiration_time: Time.now + 60.minutes, user_device_id: deviceid, user_state: user_state)
    end
    user
  end
end

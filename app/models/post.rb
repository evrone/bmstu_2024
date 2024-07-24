# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user

  validates :vk_uid, presence: true, uniqueness: true

  def self.from_vk(payload, owner)
    puts 'PAYLOAD!!!'
    puts payload
    existing_post = find_or_create_by(vk_uid: payload[:post_id]) do |post|
      # post.vk_uid = payload[:post_id],
      post.date =  payload[:date],
                   post.image_url = payload[:image_url],
                   # post.count_likes = payload[:count_likes],
                   # post.count_comments = payload[:count_comments],
                   post.likes = payload[:likers],
                   post.comments = payload[:commentators]
      post.user = owner
    end
    existing_post.update(
      date: payload[:date],
      image_url: payload[:image_url],
      # count_likes: payload[:count_likes],
      # count_comments: payload[:count_comments],
      likes: payload[:likers],
      comments: payload[:commentators]
    )
    existing_post
  end
end

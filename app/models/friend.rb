# frozen_string_literal: true

class Friend < ApplicationRecord
  has_many :relationships
  has_many :users, through: :relationships

  # validates :first_name, presence: true
  # validates :last_name, presence: true
  # validates :vk_uid, presence: true, uniqueness: true

  def self.from_vk(payload)
    existing_friend = find_or_create_by(vk_uid: payload['id']) do |friend|
      # friend.vk_uid = payload[:id],
      friend.first_name = payload['first_name'],
                          friend.last_name = payload['last_name'],
                          friend.image_url = payload['photo_50']
    end
    existing_friend.update(
      first_name: payload['first_name'],
      last_name: payload['last_name'],
      image_url: payload['photo_50']
    )
    existing_friend
  end
end

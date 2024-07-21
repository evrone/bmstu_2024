# frozen_string_literal: true

class Relationship < ApplicationRecord
  belongs_to :user
  belongs_to :friend

  validates :is_active, inclusion: { in: [true, false] }

  def self.update_activity(value, user, friend_ids)
    where(user_id: user.id, friend_id: friend_ids).update_all(is_active: value)
  end
end

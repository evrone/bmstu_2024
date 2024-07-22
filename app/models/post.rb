# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user

  validates :vk_uid, presence: true, uniqueness: true
end

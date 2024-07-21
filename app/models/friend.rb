# frozen_string_literal: true

class Friend < ApplicationRecord
  has_many :relationships
  has_many :users, through: :relationships

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :friend_id, presence: true, uniqueness: true
end

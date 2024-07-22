# frozen_string_literal: true

class Relationship < ApplicationRecord
  belongs_to :user
  belongs_to :friend

  validates :active, inclusion: { in: [true, false] }
end

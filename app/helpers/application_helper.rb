# frozen_string_literal: true

module ApplicationHelper
  def current_user
    User.first
    # nil
  end
end

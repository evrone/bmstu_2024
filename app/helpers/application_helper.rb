# frozen_string_literal: true

module ApplicationHelper
  def current_user
    @current_user ||= User.find_by(user_id: session[:user_id]) if session[:user_id]
  end

  def user_signed_in?
    !current_user.nil?
  end
end

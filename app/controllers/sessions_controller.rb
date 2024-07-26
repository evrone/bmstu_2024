# frozen_string_literal: true

require 'digest'
require 'faraday'
require 'json'
require 'date'
require_relative '../api/vk'
class SessionsController < ApplicationController
  def new
    render :new
  end

  def create # rubocop:disable Metrics/AbcSize
    unless user_signed_in?
      response = Vk.exchange_code(params['code'], session[:code_verifier], params['device_id'], params['state'])
      # поиск пользователя или создание его
      user = User.user_create(response.merge({ deviceid: params['device_id'], state: params['state'] }))
      user.link_friends(Vk.get_friends(user).map { |h| Friend.from_vk h })
      Vk.get_data(user).map { |h| Post.from_vk h, user }
      MetricsCalculator.call user
      sign_in user
    end
    redirect_to root_path
  end

  def view # rubocop:disable Metrics/AbcSize
    if user_signed_in?
      if User.needs_refresh_token?(current_user)
        response_from_refresh = Vk.refresh_usertokens(current_user.refresh_token, current_user.user_device_id,
                                                      current_user.user_state)
        current_user.update(access_token: response_from_refresh['access_token'],
                            refresh_token: response_from_refresh['refresh_token'], access_token_expiration_time: Time.current + params['expires_in'])
      end
      profile_data = Vk.get_profile_info(current_user)
      @user_name = "#{profile_data['first_name']} #{profile_data['last_name']}"
      @db = Vk.get_data(current_user)
    else
      redirect_to root_path
    end
  end

  def index
    return unless user.update_metrics_needed?

    user.update_metrics
    MetricsCalculator.call(user)

    @metrics = {
      friends: user.friends.count,
      active_friends: user.active_friends.count,
      inactive_friends: user.inactive_friends.count,
      average_likes: user.metric.average_likes,
      target_likes: user.metric.target_likes,
      average_comments: user.metric.average_comments,
      target_comments: user.metric.target_comments,
      comments_likes_ratio: user.metric.comments_likes_ratio,
      target_comments_likes_ratio: user.metric.target_comments_likes_ratio,
      average_engagement_score: user.metric.average_engagement_score,
      audience_score: user.metric.audience_score,
      active_friends_percentage: (user.active_friends.count.to_f / user.friends.count * 100).round(2),
      inactive_friends_percentage: (user.inactive_friends.count.to_f / user.friends.count * 100).round(2)
    }

    # rubocop:enable Metrics/AbcSize
  end
end

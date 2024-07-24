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

  # def challenge
  #   pkce_challenge = PkceChallenge.challenge
  #   session[:code_verifier] = pkce_challenge.code_verifier
  #   render json: { challenge: pkce_challenge.code_challenge, state: session.id.public_id }
  # end

  def create # rubocop:disable Metrics/AbcSize
    unless user_signed_in?
      response = Vk.exchange_code(params['code'], session[:code_verifier], params['device_id'], params['state'])
      userid = response['user_id'].to_i

      accesstoken = response['access_token']

      refreshtoken = response['refresh_token']
      deviceid = params['device_id']
      state = params['state']
      # поиск пользователя или создание его
      user = User.user_create(response.merge({ deviceid: params['device_id'], state: params['state'],
                                               expires_in: params['expires_in'] }))
      sign_in user
    end
    redirect_to '/sessions/view'
  end

  def view # rubocop:disable Metrics/AbcSize
    if user_signed_in?
      if User.needs_refresh_token?(current_user)
        response_from_refresh = Vk.refresh_usertokens(current_user.refresh_token, current_user.user_device_id,
                                                      current_user.user_state)
        current_user.update(access_token: response_from_refresh['access_token'],
                            refresh_token: response_from_refresh['refresh_token'], access_token_expiration_time: Time.current + params['expires_in'] )
      end
      profile_data = Vk.get_profile_info(current_user)
      @user_name = "#{profile_data['first_name']} #{profile_data['last_name']}"
      @db = Vk.get_data(current_user)
    else
      redirect_to root_path
    end
  end

  # def needs_refresh_token?
  #   Time.now > current_user.access_token_expiration_time
  # end
  # def create_user(user_id,access_token,refresh_token,device_id,state)
  #   user = User.find_or_create_by(user_id: user_id) do |u|
  #     u.access_token = access_token
  #     u.refresh_token = refresh_token
  #     u.user_device_id = device_id
  #     u.access_token_expiration_time = Time.now + 55.minutes
  #     u.user_state = state
  # end
end

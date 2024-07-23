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

  def challenge
    pkce_challenge = PkceChallenge.challenge
    session[:code_verifier] = pkce_challenge.code_verifier
    render json: { challenge: pkce_challenge.code_challenge, state: session.id.public_id }
  end

  def create
    if user_signed_in?
      redirect_to '/sessions/view'
    else
      response = Vk.exchange_code(params['code'], session[:code_verifier], params['device_id'], params['state'])
      @userId = response['user_id'].to_i
      accessToken = response['access_token']
      refreshToken = response['refresh_token']
      deviceId = params['device_id']
      state = params['state']
      # поиск пользователя или создание его
      user = User.find_or_create_by(user_id: @userId) do |u|
        u.access_token = accessToken
        u.refresh_token = refreshToken
        u.user_device_id = deviceId
        u.access_token_expiration_time = Time.now + 55.minutes
        u.user_state = state
      end
      # проверка создания нового пользователя (если не создали то обновляем)
      if user.persisted?
        user.update(access_token: accessToken, refresh_token: refreshToken,
                    access_token_expiration_time: Time.now + 55.minutes, user_device_id: deviceId, user_state: state)
        puts('SUCCSEFUL UPDATED')
      end
      sign_in user
      @user_is_signed_in = user_signed_in?
      redirect_to '/sessions/view'
    end
  end

  def view
    if user_signed_in?
      if needs_refresh_token?
        response_from_refresh = Vk.refresh_userTokens(current_user.refresh_token, current_user.user_device_id,
                                                      current_user.user_state)
        puts(response_from_refresh)

        current_user.update(access_token: response_from_refresh['access_token'],
                            refresh_token: response_from_refresh['refresh_token'], access_token_expiration_time: Time.now + 55.minutes)
      end
      puts('PROFILE')
      puts(current_user.access_token)
      profile_data = Vk.get_profile_info(current_user)
      @user_name = profile_data['first_name'] + ' ' + profile_data['last_name']
      puts(@user_name)
    else
      redirect_to root_path
    end
  end

  def user_sign_out
    if user_signed_in?
      sign_out @current_user
      redirect_to root_path
    else
      puts('no user founded')
      redirect_to root_path
    end
  end

  def needs_refresh_token?
    Time.now > current_user.access_token_expiration_time
  end
end

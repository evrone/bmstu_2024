# frozen_string_literal: true

require 'digest'
require 'faraday'
require 'json'
require 'date'
require_relative 'vkapiclient'
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
      response = exchange_code(params['code'], session[:code_verifier], params['device_id'], params['state'])
      @userId = response['user_id'].to_i
      accessToken = response['access_token']
      refreshToken = response['refresh_token']
    # поиск пользователя или создание его
      user = User.find_or_create_by(user_id: @userId) do |u|
        u.access_token = accessToken
        u.refresh_token = refreshToken
        u.access_token_expiration_time = Time.now + 55.minutes
      end
    #проверка создания нового пользователя (если не создали то обновляем)
      if user.persisted?
        user.update(access_token: accessToken, refresh_token: refreshToken, access_token_expiration_time: Time.now + 55.minutes)
      end
      sign_in user
      @user_is_signed_in = user_signed_in?
      redirect_to '/sessions/view'
    end
  end
  def view
    if user_signed_in?
      if needs_refresh_token?
      #переход в другой контроллер (надо обратиться к vk_sdk)
      else
        puts(current_user.access_token)
        vk_client = VkApiClient.new(@current_user.refresh_token, @current_user.access_token, @current_user.user_id)
        profile_data = vk_client.get_profile_info()
        @user_name = profile_data['first_name'] + " " + profile_data["last_name"]
      end
    else
      redirect_to root_path
    end
  end

  def user_sign_out
    if user_signed_in?
    sign_out current_user
    else
      puts("no user founded")
    end
  end

  def exchange_code(code, code_verifier, device_id, state)
    conn = Faraday.new(url: 'https://id.vk.com') do |conn_builder|
      conn_builder.headers['Content-Type'] = 'application/json'
      conn_builder.headers['Accept'] = 'application/json'
      conn_builder.request :json
      conn_builder.response :json
      conn_builder.response :logger
    end

    response = conn.post('/oauth2/auth', {
                           grant_type: 'authorization_code',
                           code:,
                           code_verifier:,
                           device_id:,
                           redirect_uri: 'http://localhost/auth/vkontakte/callback/',
                           state:,
                           client_id: '51989509'
                         })
    response.body
  end
  def needs_refresh_token?
    Time.now > @current_user.access_token_expiration_time 
  end
end

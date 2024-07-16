# frozen_string_literal: true

require 'digest'
require 'faraday'
require 'json'

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
    exchange_code(params['code'], session[:code_verifier], params['device_id'], params['state'])
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
                           redirect_uri: 'https://wheremylikes.com/auth/vkontakte/callback/',
                           state:,
                           client_id: '51989509'
                         })
    puts response.body['access_token']
  end
end

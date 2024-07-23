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

  def index
    if user.update_metrics_needed?
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
    end

    private

    def current_user
      User.first
    end

  end
end

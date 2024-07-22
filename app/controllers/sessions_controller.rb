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
  def show
    @user = User.find(params[:id])
    posts = @user.posts
    friends = @user.friends
    metrics = SocialMetrics.new(posts, friends)
    if user_signed_in?
      @metrics = {
        active_friends: metrics.active_friends.size,
        inactive_friends: metrics.inactive_friends.size,
        active_friends_percentage: (metrics.active_friends.size.to_f / friends.size * 100).round,
        inactive_friends_percentage: (metrics.inactive_friends.size.to_f / friends.size * 100).round,
        friends: friends.size,
        average_engagement_score: metrics.average_engagement_score,
        average_likes: metrics.average_likes,
        comments_likes_ratio: metrics.comments_likes_ratio,
        target_likes: metrics.target_likes,
        target_comments_likes_ratio: metrics.target_comments_likes_ratio,
        audience_score: metrics.audience_score,
        average_comments: metrics.average_comments,
        target_engagement: metrics.target_engagement_score
      }
    else
      @metrics = {
        active_friends: '170k',
        active_friends_percentage: '100',
        inactive_friends: '0',
        inactive_friends_percentage: '0',
        friends: '169.7k',
        average_engagement_score: '1.81%',
        average_likes: '2.95k',
        comments_likes_ratio: '7.1%',
        target_likes: '10.2k',
        target_comments_likes_ratio: '4%',
        audience_score: '10.0'
      }
    end
  end
end

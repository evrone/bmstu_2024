# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    # @code_verifier = SecureRandom.urlsafe_base64(64)
    # @code_challenge = Digest::SHA256.base64digest(@code_verifier)
    # @state = 'df29figadjsd82'
    # @scopes = 'vkid.personal_info friends wall'\
    # @data_attributes = {
    #   code_challenge: @code_challenge,
    #   state: @state,
    #   scopes: @scopes
    # }.to_json
    pkce_challenge = PkceChallenge.challenge
    session[:code_verifier] = pkce_challenge.code_verifier
    @data_attributes = {
      challenge: pkce_challenge.code_challenge, state: session.id.public_id
    }.to_json

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

  def auth
    @response = HTTParty.post('https://id.vk.com/oauth2/auth',
                              body: {
                                code:,
                                code_verifier:,
                                device_id:,
                                grant_type: 'authorization_code'
                              })
  end
end

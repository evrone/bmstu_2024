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

  def show
    @user = User.find(params[:id])
    metrics_service = SocialMetricsService.new(@user)
    @metrics = metrics_service.calculate_metrics
  end
end

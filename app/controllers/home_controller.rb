# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    @user_is_signed_in_home = user_signed_in?
    if @user_is_signed_in_home
      puts("HOME ACCSES TOKEN")
      puts(@current_user.access_token)
      # redirect_to '/sessions/view'
    else

    #puts("INDEX HOME CURRENT USER")
    #puts(@user_is_signed_in_home)
    #puts(@current_user.user_id)
    # @code_verifier = SecureRandom.urlsafe_base64(64)
    # @code_challenge = Digest::SHA256.base64digest(@code_verifier)
    # @state = 'df29figadjsd82'
    # @scopes = 'vkid.personal_info friends wall'\
    # @data_attributes = {
    #   code_challenge: @code_challenge,
    #   state: @state,
    #   scopes: @scopes
    # }.to_json
    # if session[:user_id]
    #   @user = Users.find_by(user_id: session[:user_id])
    #   puts(@user.user_id)
    #   redirect_to '/vkchecker/view'
    # else
    pkce_challenge = PkceChallenge.challenge
    session[:code_verifier] = pkce_challenge.code_verifier
    @data_attributes = {
      challenge: pkce_challenge.code_challenge, state: session.id.public_id
    }.to_json
    end
  # end
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

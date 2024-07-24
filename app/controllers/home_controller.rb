# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    if current_user
      redirect_to sessions_view_path
    else
      pkce_challenge = PkceChallenge.challenge
      session[:code_verifier] = pkce_challenge.code_verifier
      @data_attributes = {
        challenge: pkce_challenge.code_challenge, state: session.id.public_id
      }.to_json
    end
  end
end

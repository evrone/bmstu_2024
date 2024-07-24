# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    unless current_user
      pkce_challenge = PkceChallenge.challenge
      session[:code_verifier] = pkce_challenge.code_verifier
      @data_attributes = {
        challenge: pkce_challenge.code_challenge, state: session.id.public_id
      }.to_json
    end
  end
end

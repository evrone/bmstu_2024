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
      puts ("FIRST CODE")
      puts  params['code']
      response = exchange_code(params['code'], session[:code_verifier], params['device_id'], params['state'])
    end

    
    def exchange_code(code, code_verifier, device_id, state)
      puts('SECOND CODE')
      puts code;
      conn = Faraday.new(url: 'https://id.vk.com')

      response = conn.post do |req|
        req.url '/oauth2/auth'
        req.headers['Content-Type'] = 'application/json'
        req.headers['Accept'] = 'application/json'
        req.params['grant_type'] = 'authorization_code'
        req.params['code'] = code
        req.params['code_verifier'] = code_verifier
        req.params['device_id'] = device_id
        req.params['redirect_uri'] = 'https://wheremylikes.com/auth/vkontakte/callback/'
        req.params['state'] = state
        req.params['client_id'] = '51989509'
      end
      puts response.body
        puts("hello")
    end
end


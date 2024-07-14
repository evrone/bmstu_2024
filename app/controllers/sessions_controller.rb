require 'httparty'
require 'digest'
class SessionsController < ApplicationController
    def new
        render :new
    end

    def create
      @code = params[:code]
      @code_verifier = params[:code_verifier]
      @device_id = params[:device_id]
      # response = HTTParty.post('https://id.vk.com/oauth2/auth',
      #   body: {
      #   code: code,
      #   code_verifier: code_verifier,
      #   device_id: device_id,
      #   grant_type: 'authorization_code'
      #   }
      # )

      render :create
    end
end

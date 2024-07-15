require 'instagram_basic_display'
require 'instagram_graph_api'

class SessionsController < ApplicationController
    def new
        render :new
    end

    def create
        response = HTTParty.post('https://id.vk.com/oauth2/auth',
        body: {
          code: :code,
          code_verifier: :code_verifier,
          device_id: :device_id,
          grant_type: 'authorization_code'
        }
      )
      puts response

        render :create
    end
end

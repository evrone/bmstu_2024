require 'instagram_basic_display'
require 'instagram_graph_api'

class SessionsController < ApplicationController
    def new
        render :new
    end

    def create
        code = params[:code]

        client = InstagramBasicDisplay::Client.new
        
        short_token_response = client.short_lived_token(access_code: code)
        access_token = short_token_response.payload.access_token
        client = InstagramBasicDisplay::Client.new(auth_token: access_token)

        @user_id = short_token_response.payload.user_id

        graph_client = InstagramGraphApi.client(access_token)
        puts graph_client

        puts graph_client.ig_business_accounts("name,profile_picture_url")
        
        response = client.profile(user_id: @user_id, fields: %i[username])
        @instagram_username = response.payload.username

        response = client.media_feed(fields: %i[caption media_url])
        @photos = response.payload.data.map { |post| post["media_url"] }

        render :create
    end
end
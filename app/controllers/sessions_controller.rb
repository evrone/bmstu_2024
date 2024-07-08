require 'httparty'
require 'uri'
require 'instagram_basic_display'

class SessionsController < ApplicationController
    def new
        render :new
    end

    def create
        code = params[:code]

        response = HTTParty.post("https://api.instagram.com/oauth/access_token", 
            body: {
                client_id: ENV['INSTAGRAM_CLIENT_ID'] ,
                client_secret: ENV['INSTAGRAM_CLIENT_SECRET'],
                grant_type: 'authorization_code',
                redirect_uri: 'https://wheremylikes.com/auth/instagram/callback/',
                code: code
            }
        )

        parsed_json = JSON.parse(response.body)
        short_lived_token = parsed_json['access_token']
        @user_id = parsed_json['user_id']
        user = User.first

        client = InstagramBasicDisplay::Client.new(auth_token: short_lived_token )
        graph_client = InstagramGraphApi.client(short_lived_token)

        puts graph_client.ig_business_accounts("name,profile_picture_url")
        
        response = client.profile(user_id: @user_id, fields: %i[username])
        @instagram_username = response.payload.username

        response = client.media_feed(fields: %i[caption media_url])
        @photos = response.payload.data.map { |post| post["media_url"] }

        render :create
    end
end
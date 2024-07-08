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
            client_id: ENV['INSTAGRAM_ID'] ,
            client_secret: ENV['INSTAGRAM_SECRET'],
            grant_type: 'authorization_code',
            redirect_uri: 'https://wheremylikes.com/auth/instagram/callback/',
            code: code
        }
        )
    #response -> access token
        parsed_json = JSON.parse(response.body)
        short_lived_token = parsed_json['access_token']
        @user_id = parsed_json['user_id']
        user = User.first
        client = InstagramBasicDisplay::Client.new(auth_token: short_lived_token )
        response = client.profile(user_id: @user_id, fields: %i[username])
        @instagram_username = response.payload.username
        #response = client.media_feed(fields: %i[caption media_url])

        #@media = response.payload.data[0]
        #media1 =
        media_t = client.media_node(media_id: 17964270472445513, fields: %i[caption media_url id])
        @photos = media_t.payload.media_url
            render :create
        end
    end
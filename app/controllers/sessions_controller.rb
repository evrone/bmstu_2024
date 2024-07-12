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
      
      render :create
    end
end

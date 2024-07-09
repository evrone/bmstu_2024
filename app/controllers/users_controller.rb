class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    @profile = user.get_profile_info
  end
end

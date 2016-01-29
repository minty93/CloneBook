class Api::SessionsController < ApplicationController

  def show
    if current_user
      @user = current_user
      render "api/posts/index"
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:email],
      params[:password]
    )

    if @user.nil?
      render json: ["Wrong email/password combo!"], status: 401
    else
      login!(@user)
      render "api/posts/index"
    end
  end

  def destroy
    logout!
  end


end

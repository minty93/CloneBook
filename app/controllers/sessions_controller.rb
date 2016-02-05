class SessionsController < ApplicationController

  def new

  end

  def create

    user = User.find_by_credentials(
      params[:email],
      params[:password]
    )

    if user.nil?
      flash.now[:alert] = "Wrong email/password combo"
      render :new, status: 401
    else
      login!(user)
      flash[:success] = "Welcome back!"
      redirect_to root_url
    end
  end

  def destroy
    logout!
    flash[:success] = "Thank you, come again."
    redirect_to new_user_url
  end

  def omniauth_facebook
    @user = User.find_or_create_by_auth_hash(auth_hash)
    login!(@user)
    redirect_to root_url + '#/'
  end

  private
    def auth_hash
      request.env['omniauth.auth']
    end

end

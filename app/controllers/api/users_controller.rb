class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update]
  def index
    @users = User.all.includes(:received_posts)
  end

  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end


  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end


  def create
    @user = User.new(user_params)
      if @user.save
        login!(@user)
        render json: @user
      else
        flash.now[:errors] = @user.errors.full_messages
        render json: @user.errors.full_messages, status: 422
      end

  end



  # # DELETE /users/1
  # # DELETE /users/1.json
  # def destroy
  #   @user.destroy
  #   respond_to do |format|
  #     format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:email, :password, :birthday, :gender, :fname, :lname, :profile_pic, :cover_pic, :photos, :friends, :bucket)
    end
end

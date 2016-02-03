class Api::PhotosController < ApplicationController

  def create
    @photo = Photo.new(photo_params)
    @photo.user_id = current_user.id
    @photo.save!
    render :show
  end

  def show
    @photo = Photo.find(params[:id])
    render :show
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy!
    render :show
  end


  private

  def photo_params
    params.require(:photo).permit(:photo, :description)
  end

end

class Api::ImagesController < ApplicationController

  def create
    @image = Image.new(image_params)
    @image.user_id = current_user.id
    @image.save!
    render :show
  end

  def show
    @image = Image.find(params[:id])
    render :show
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy!
    render :show
  end


  private

  def image_params
    params.require(:image).permit(:image, :description)
  end

end

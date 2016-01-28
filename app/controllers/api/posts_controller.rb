class Api::PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.all
  end


  def show
  end

  def new
    @post = Post.new
  end


  def edit
  end



  def create
    @post = Post.new(post_params)
    @post.profile_id ||= current_user.id
    @post.author_id = current_user.id
    @post.author_name = current_user.fname + " " + current_user.lname
      if @post.save
        render json: @post
      else
        render json: @post.errors.full_messages, status: :unprocessable_entity
      end
  end


  def update

      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors.full_messages, status: :unprocessable_entity
      end

  end


  def destroy
    @post.destroy
    render json: "Post destroyed"
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:body, :author_id, :profile_id)
    end
end

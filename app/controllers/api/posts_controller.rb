class Api::PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :ensure_user_logged_in


  def index
    @posts = Post.all.includes(:comments, :author)
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
        render :show
      else
        render json: @post.errors.full_messages, status: :unprocessable_entity
      end
  end


  def update

      if @post.update(post_params)
        render :show
      else
        render json: @post.errors.full_messages, status: :unprocessable_entity
      end

  end


  def destroy
    render json: @post
    @post.destroy
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:body, :author_id, :profile_id, :likes)
    end
end

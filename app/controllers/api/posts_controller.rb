class Api::PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :ensure_user_logged_in


  def index
    posts = Post.all.includes(:comments, :author)
    req_friends = []
    rec_friends =[]
    friends = []
    b = current_user.received_friends.to_a
    a = current_user.requested_friends.to_a


     a.each do |friend|
       req_friends.push(friend.requestee_id)
     end

     b.each do |friend|
       rec_friends.push(friend.requester_id)
     end

     req_friends.each do |id|
       if rec_friends.include?(id)
         friends.push(id)
       end
     end

     @posts = posts.where("posts.author_id IN (?) OR posts.profile_id IN (?)", friends, friends).to_a


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
    @post.profile_name ||= current_user.fname + " " + current_user.lname
    @post.profile_id ||= current_user.id
    @post.author_id = current_user.id
    # @post.profile_pic = current_user.profile_pic.url
    @post.author_name = current_user.fname + " " + current_user.lname
      if @post.save
        render json: @post
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
      params.require(:post).permit(:body, :author_id, :profile_id, :likes, :profile_name)
    end
end

class Api::FriendRequestsController < ApplicationController
  before_action :set_friend_request, only: [:show, :edit, :update]

  # GET /friend_requests
  # GET /friend_requests.json
  def index
    @friend_requests = FriendRequest.all.order('"created_at" DESC')
    render :show
  end


  def new
    @friend_request = FriendRequest.new
  end


  # POST /friend_requests
  # POST /friend_requests.json
  def create

    @friend_request = FriendRequest.new(friend_request_params)
    @friend_request.requester_id = current_user.id
    requestee_id = @friend_request.requestee_id
    # user = User.where("id = ?", requestee_id).to_a
    name = (current_user.fname + " " + current_user.lname)
    @friend_requests = FriendRequest.all

    i = 0
    relevantFriend = true
    while i < @friend_requests.length
      if (@friend_requests[i].requestee_id === @friend_request.requestee_id && @friend_requests[i].requester_id === @friend_request.requester_id)
         relevantFriend = false;
      end
      i = i + 1
    end



      if (relevantFriend)
        @friend_request.save!
        # yuck = FriendRequest.create!({requester_id: requestee_id, requestee_id: current_user.id, profile_pic: current_user.profile_pic, name: name})
        render :show
      else
        render json: @friend_request.errors, status: :unprocessable_entity
      end
  end


  # def update
  #   respond_to do |format|
  #     if @friend_request.update(friend_request_params)
  #       format.html { redirect_to @friend_request, notice: 'Friend request was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @friend_request }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @friend_request.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end
  #

  def destroy
    requestee_id = params["requestee_id"].to_i
    current_user_id = current_user.id
    @friend_request = FriendRequest.where(["requestee_id = ? and requester_id = ?", requestee_id, current_user_id])
    @friend_request = @friend_request[0]
    friend_request2 = FriendRequest.where(["requester_id = ? and requestee_id = ?", requestee_id, current_user_id])
    friend_request2[0].destroy
    @friend_request.destroy
    render :show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend_request
      @friend_request = FriendRequest.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def friend_request_params
      params.require(:friend_request).permit(:requester_id, :requestee_id, :approved, :name, :profile_pic)
    end
end

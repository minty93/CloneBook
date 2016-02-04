class AddProfilePicAndNameToFriendRequests < ActiveRecord::Migration
  def change
    add_column :friend_requests, :profile_pic, :string
    add_column :friend_requests, :name, :string
  end
end

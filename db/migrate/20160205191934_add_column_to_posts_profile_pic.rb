class AddColumnToPostsProfilePic < ActiveRecord::Migration
  def change
    add_column :posts, :profile_pic, :string
  end
end

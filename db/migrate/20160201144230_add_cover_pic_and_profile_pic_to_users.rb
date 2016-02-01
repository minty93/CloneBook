class AddCoverPicAndProfilePicToUsers < ActiveRecord::Migration
  def self.up
  change_table :users do |t|
    t.attachment :cover_pic
    t.attachment :profile_pic
  end
end

def self.down
  remove_attachment :users, :cover_pic
  remove_attachment :users, :profile_pic
end
end

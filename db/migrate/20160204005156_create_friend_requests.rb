class CreateFriendRequests < ActiveRecord::Migration
  def change
    create_table :friend_requests do |t|
      t.integer :requester_id, null: false, index: true, foreign_key: true
      t.integer :requestee_id, null: false, index: true, foreign_key: true
      t.boolean :approved, default: false
  
      t.timestamps null: false
    end
  end
end

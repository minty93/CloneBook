class FriendRequest < ActiveRecord::Base

  belongs_to(
  :user,
  foreign_key: :requester_id,
  primary_key: :id,
  class_name: "User"
  )
end

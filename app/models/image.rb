class Image < ActiveRecord::Base

  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/


    belongs_to(:user, foreign_key: :user_id, primary_key: :id, class_name: "User")

end

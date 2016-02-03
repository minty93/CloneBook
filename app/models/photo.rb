class Photo < ActiveRecord::Base

  has_attached_file :photo, default_url: "missing.png"
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/


  belongs_to(:user, foreign_key: :user_id, primary_key: :id, class_name: "User")

end

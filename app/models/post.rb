class Post < ActiveRecord::Base
  validates :author_id, :body, :profile_id, :author_name, presence: true

  belongs_to(:author, foreign_key: :author_id, primary_key: :id, class_name: "User")
  belongs_to(:profile, foreign_key: :profile_id, primary_key: :id, class_name: "User")

  has_many :comments, as: :commentable


end

class Post < ActiveRecord::Base
  validates :author_id, :body, presence: true

  belongs_to(:author, foreign_key: :author_id, primary_key: :id, class_name: "User")
  belongs_to(:profile, foreign_key: :profile_id, primary_key: :id, class_name: "User")

  def self.profile_posts(id)
    Post.where("profile_id = ?", id)
  end

end

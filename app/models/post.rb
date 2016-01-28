class Post < ActiveRecord::Base
  validates :author_id, :body, :profile_id, presence: true

  belongs_to(:author, foreign_key: :author_id, primary_key: :id, class_name: "User")
  belongs_to(:profile, foreign_key: :profile_id, primary_key: :id, class_name: "User")

  def self.hash_query(post_params)
    if post_params[:profile_id] == ""
      return true
    end
    return false
  end

end

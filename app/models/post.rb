class Post < ActiveRecord::Base
  include PgSearch

  multisearchable :against => [:body]

  PgSearch.multisearch_options = {
  :using => [:tsearch]
  }


  validates :author_id, :body, :profile_id, :author_name, presence: true

  belongs_to(:author, foreign_key: :author_id, primary_key: :id, class_name: "User")
  belongs_to(:profile, foreign_key: :profile_id, primary_key: :id, class_name: "User")

  has_many :comments, as: :commentable
  has_many :likes, as: :likeable





end

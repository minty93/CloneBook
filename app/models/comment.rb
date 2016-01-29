class Comment < ActiveRecord::Base
  validates :body, :author_id, :author_name, presence: true

  belongs_to :commentable, polymorphic: true

end

class Comment < ActiveRecord::Base

  include PgSearch

  multisearchable :against => [:description]

  PgSearch.multisearch_options = {
  :using => [:tsearch, :trigram]
  }

  validates :description, :author_id, :author_name, presence: true

  belongs_to :commentable, polymorphic: true

end

json.extract! post, :id, :body, :author_id, :profile_id, :author_name, :author
json.comments post.comments do |comment|
  json.extract! comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type, :created_at
end

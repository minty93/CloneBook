json.extract! @post, :id, :body, :author_id, :profile_id, :author_name, :author
json.comments @post.comments do |comment|
  json.extract! comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type
end
json.likes @post.likes do |like|
  json.extract! like, :id, :likeable_id, :likeable_type
end

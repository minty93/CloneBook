json.extract! @comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type, :created_at
json.likes @comment.likes do |like|
  json.extract! like, :id, :likeable_id, :likeable_type, :author_id
end

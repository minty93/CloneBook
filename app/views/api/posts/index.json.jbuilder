json.array!(@posts) do |post|
  json.extract! post, :id, :body, :author_id, :profile_id, :author_name, :author, :created_at, :profile_pic, :profile_name
  json.comments post.comments do |comment|
    json.extract! comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type, :created_at
  end
  json.likes post.likes do |like|
    json.extract! like, :id, :likeable_id, :likeable_type
  end

end

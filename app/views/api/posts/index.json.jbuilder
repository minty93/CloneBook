json.array!(@posts) do |post|
  json.extract! post, :id, :body, :author_id, :profile_id, :author_name
  json.comments post.comments do |comment|
    json.extract! comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type
  end
end

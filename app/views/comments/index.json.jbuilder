json.array!(@comments) do |comment|
  json.extract! comment, :id, :created_at,  :updated_at, :commentable_id, :description, :created_at
  json.url comment_url(comment, format: :json)
end

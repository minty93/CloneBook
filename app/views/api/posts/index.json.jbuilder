json.array!(@posts) do |post|
  json.extract! post, :id, :body, :author_id, :profile_id, :author_name
end

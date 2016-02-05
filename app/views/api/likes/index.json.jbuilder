json.array!(@likes) do |like|
  json.extract! like, :id, :likeable_id, :likeable_type
end

json.array!(@photos) do |photo|
  json.extract! photo, :id, :user_id
  json.photo_url asset_path(photo.photo.url)
end

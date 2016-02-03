json.extract! @image, :id, :user_id
json.image_url asset_path(@image.image.url)

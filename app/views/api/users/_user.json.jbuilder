json.extract! user, :id, :email, :fname, :lname 
json.cover_pic_url asset_path(user.cover_pic.url)
json.profile_pic_url asset_path(user.profile_pic.url)

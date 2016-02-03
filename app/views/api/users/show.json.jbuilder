json.extract! @user, :id, :fname, :lname, :email, :gender, :profile_pic, :cover_pic, :birthday

json.authored_posts @user.authored_posts do |post|
  json.extract! post, :id, :body, :author_id, :profile_id, :author_name
  json.comments post.comments do |comment|
    json.extract! comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type
  end
end

json.received_posts @user.received_posts do |post|
  json.extract! post, :id, :body, :author_id, :profile_id, :author_name
  json.comments post.comments do |comment|
    json.extract! comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type
  end

  json.photos @user.photos do |photo|
    json.photo_url asset_path(@user.photo.url)
  end
end

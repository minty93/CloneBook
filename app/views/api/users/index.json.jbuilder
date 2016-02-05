json.array!(@users) do |user|
  json.extract! user, :id, :fname, :lname, :email, :gender, :session_token, :profile_pic, :cover_pic, :birthday
  json.authored_posts user.authored_posts do |post|
    json.extract! post, :id, :body, :author_id, :profile_id, :author_name
    json.comments post.comments do |comment|
      json.extract! comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type, :created_at
    end
  end

  json.received_posts user.received_posts do |post|
    json.extract! post, :id, :body, :author_id, :profile_id, :author_name, :created_at
    json.comments post.comments do |comment|
      json.extract! comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type
    end
  end

  json.photos user.photos do |photo|
    json.photo_url asset_path(photo.photo.url)
  end


  # json.friends user.friends do |friend|
  #   json.extract! friend, :id, :requestee_id, :requester_id, :profile_pic,:name
  # end


  # json.friends_asked user.friends_asked do |friend|
  #   json.extract! friend, :id, :requestee_id, :requester_id, :profile_pic,:name
  # end
  end

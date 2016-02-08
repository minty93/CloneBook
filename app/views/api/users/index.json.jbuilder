json.array!(@users) do |user|
  json.extract! user, :id, :fname, :lname, :email, :gender, :session_token, :profile_pic, :cover_pic, :birthday
  json.authored_posts user.authored_posts do |post|
    json.extract! post, :id, :body, :author_id, :profile_id, :author_name, :author, :profile_pic
    json.comments post.comments do |comment|
      json.extract! comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type, :created_at
    end
  end

  json.received_posts user.received_posts do |post|
    json.extract! post, :id, :body, :author_id, :profile_id, :author_name, :created_at, :profile_pic
    json.comments post.comments do |comment|
      json.extract! comment, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type
    end
  end

  json.photos user.photos do |photo|
    json.photo_url asset_path(photo.photo.url)
  end

  json.received_friends user.received_friends do |friend|
    json.extract! friend,  :requester_id
  end

  json.requested_friends user.requested_friends do |friend|
    json.extract! friend, :requestee_id
  end


  # json.friends user.friends do |friend|
  #   json.extract! friend, :id, :requestee_id, :requester_id, :profile_pic,:name
  # end


  # json.friends_asked user.friends_asked do |friend|
  #   json.extract! friend, :id, :requestee_id, :requester_id, :profile_pic,:name
  # end
  end

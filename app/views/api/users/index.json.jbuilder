json.array!(@users) do |user|
  json.extract! user, :id, :fname, :lname, :email, :gender, :session_token
  json.authored_posts user.authored_posts do |post|
    json.extract! post, :id, :body, :author_id, :profile_id, :author_name
  end

  json.received_posts user.received_posts do |post|
    json.extract! post, :id, :body, :author_id, :profile_id, :author_name
  end

end

json.results do
  json.array! @search_results do |result|
    result = result.searchable

    if result.class == User
      json.partial!("api/users/user", user: result)
    elsif result.class == Post
      json.partial!("api/posts/post", post: result)
    else
      json.partial!("api/comments/comments", comment: result)
    end

    json._type result.class.to_s
  end
end

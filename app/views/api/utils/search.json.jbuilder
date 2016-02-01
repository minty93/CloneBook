json.results do
  json.array! @search_results do |result|
    result = result.searchable

    if result.class == User
      json.extract! result, :id, :fname, :lname, :email
    elsif result.class == Post
      json.extract! result, :id, :body, :author_id, :profile_id, :author_name
    else
      json.extract! result, :id, :description, :author_id, :author_name, :commentable_id, :commentable_type
    end

    json._type result.class.to_s
  end
end

json.array!(@friend_requests) do |friend_request|
  json.extract! friend_request, :id, :requestee_id, :requester_id, :approved, :created_at, :updated_at
end

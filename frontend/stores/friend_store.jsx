var Store = require('flux/utils').Store;
var UserConstants = require('../constants/user_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');

var FriendStore = new Store(AppDispatcher);

var _friends = [];

var resetFriends = function(friends){
  _friends = friends.slice(0);
};

var addNewFriend = function(newFriend){
  _friends.push(newFriend);
};

FriendStore.all = function () {
  return _friends.slice(0);
};

FriendStore.getByFriends = function(friends) {
  var requester_id = parseInt(friends.requester_id);
  var requestee_id = parseInt(friends.requestee_id);
  var friends = FriendStore.all();
  var relevantFriend = {};

  friends.forEach(function(friend){
    if (friend.requestee_id === requestee_id && friend.requester_id === requester_id){
      relevantFriend = friend;
    }
  });
  return relevantFriend;
};

FriendStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.FRIEND_RECEIVED:
      var result = addNewFriend(payload.friend);
      FriendStore.__emitChange();
      break;
    case UserConstants.FRIENDS_RECEIVED:
      var result = resetFriends(payload.friends);
      FriendStore.__emitChange();
      break;
    case UserConstants.FRIEND_REMOVED:
      var result = resetFriends(payload.friends);
      FriendStore.__emitChange();
  }
};

module.exports = FriendStore;

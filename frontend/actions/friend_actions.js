
var UserConstants = require('../constants/user_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var FriendActions = {

receiveNewFriend: function(friend){
    AppDispatcher.dispatch({
      actionType: UserConstants.FRIEND_RECEIVED,
      friend: friend
    });
  },

  removedFriend: function(friend){
    AppDispatcher.dispatch({
      actionType: UserConstants.FRIEND_REMOVED,
      friend: friend
    });
  },
  receiveAllFriends: function(friends){
    AppDispatcher.dispatch({
      actionType: UserConstants.FRIENDS_RECEIVED,
      friends: friends
    });
  },
};

module.exports = FriendActions;

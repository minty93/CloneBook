var FriendActions = require('../actions/friend_actions');

var FriendApiUtil = {

  createFriend: function(friend){
    $.ajax({
       method: 'POST',
       url: 'api/friend_requests',
       data: {friend_request: friend},
       success: function(friend) {
         FriendActions.receiveNewFriend(friend);
      },
     });
  },


  fetchFriends: function(){
    $.ajax({
       method: 'GET',
       url: 'api/friend_requests',
       success: function(friends) {
         FriendActions.receiveAllFriends(friends);
      },
     });
  },

  deleteFriend: function(friend){

    $.ajax({
       method: 'DELETE',
       url: 'api/friend_requests' + data.id,
       data: friend,
       success: function(friend) {
        FriendActions.removedFriend(friend);
      },
     });
  },
}



module.exports = FriendApiUtil;

var React = require("react");
var CommentStore = require("../stores/CommentStore");
var PostStore = require("../stores/PostStore");
var CommentsApiUtil = require('../util/comments_api_util');
var PostsApiUtil = require('../util/posts_api_util');
var FriendApiUtil = require('../util/friends_api_util');
var UserStore = require("../stores/UserStore");


var FriendRequestItem = React.createClass({

  _findUserById: function(id) {
    id = parseInt(id);
    users = UserStore.all();
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        return users[i];
      }
    }
  },

handleFriend: function(){
  user = this._findUserById(this.props.params.userId);
  name = user.fname + " " + user.lname;
  FriendApiUtil.createFriend({requestee_id: this.props.params.userId, profile_pic: user.profile_pic, name: name})

},



  getInitialState: function(){},

  render: function() {
    var userprofile = this._findUserById(this.props.params.userId);
    var currentUser = CurrentUserStore.user;

    var button;
    var my_received_friends = currentUser.received_friends;
    var myreqf = currentUser.requested_friends;
    var hisreq = userprofile.received_friends;
    var hisrec = userprofile.requested_friends;
    
    return (
      <div>
          <button className="friend-button" onClick={this.handleFriend}>Friend</button>
      </div>
    );
  },


});

module.exports = FriendRequestItem;

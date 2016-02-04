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

  render: function() {
    return (
      <div>
          <button className="friend-button" onClick={this.handleFriend}>Friend</button>
      </div>
    );
  },


});

module.exports = FriendRequestItem;

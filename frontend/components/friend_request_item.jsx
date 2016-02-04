var React = require("react");
var CommentStore = require("../stores/CommentStore");
var PostStore = require("../stores/PostStore");
var CommentsApiUtil = require('../util/comments_api_util');
var PostsApiUtil = require('../util/posts_api_util');
var FriendApiUtil = require('../util/friends_api_util');


var FriendRequestItem = React.createClass({

handleFriend: function(){
  FriendApiUtil.createFriend({requestee_id: this.props.params.userId})

},

  render: function() {
    return (
      <div>
          <button onClick={this.handleFriend}>Friend</button>
      </div>
    );
  },


});

module.exports = FriendRequestItem;

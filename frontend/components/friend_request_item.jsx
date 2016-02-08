var React = require("react");
var CommentStore = require("../stores/CommentStore");
var PostStore = require("../stores/PostStore");
var CurrentUserStore = require("../stores/current_user_store");
var CommentsApiUtil = require('../util/comments_api_util');
var PostsApiUtil = require('../util/posts_api_util');
var FriendApiUtil = require('../util/friends_api_util');
var UserStore = require("../stores/UserStore");
var UserApiUtil = require('../util/users_api_util');



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

  getInitialState: function(){
    user = this._findUserById(this.props.params.userId);
    return {user: {} };
  },

  componentDidMount: function() {
    this.listener = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  _onChange: function(){
    user = this._findUserById(this.props.params.userId);
    this.setState({user: user})
  },

  componentWillReceiveProps(newProps){
    user = this._findUserById(newProps.params.userId);
    this.setState({user: user})
  },



handleFriend: function(){
  user = this.state.user
  name = user.fname + " " + user.lname;
  FriendApiUtil.createFriend({requestee_id: this.props.params.userId, profile_pic: user.profile_pic, name: name});
  UserApiUtil.fetchUser(this.props.params.userId);

},


handleDelete: function(){

  user = this.state.user
  name = user.fname + " " + user.lname;
  FriendApiUtil.deleteFriend({requestee_id: this.props.params.userId, profile_pic: user.profile_pic, name: name});
  UserApiUtil.fetchUser(this.props.params.userId);

},




  render: function() {

    var userprofile = this._findUserById(this.props.params.userId);
    var currentUser = this._findUserById(CurrentUserStore.user().id);
    var profileid = parseInt(this.props.params.userId);

    var button = (<div></div>);
    var rec_friends =[];
    currentUser.received_friends.forEach(function(friend){
      rec_friends.push(friend.requester_id);}
    );
    var req_friends = [];

    currentUser.requested_friends.forEach(function(friend){
      req_friends.push(friend.requestee_id);
    }
    );

    if (rec_friends.indexOf(profileid) !== -1 && req_friends.indexOf(profileid) !== -1) {
      button = <button className="friend-button" onClick={this.handleDelete}>Unfriend</button>;
    }
    else if (rec_friends.indexOf(profileid) !== -1 && req_friends.indexOf(profileid) == -1){
        button = <button className="friend-button" onClick={this.handleFriend}>Accept Friendship</button>;
    }
    else if(rec_friends.indexOf(profileid) == -1 && req_friends.indexOf(profileid) == -1 && profileid !== currentUser.id ) {
      button = <button className="friend-button" onClick={this.handleFriend}>Send Friendship</button>;
    }
    else if(rec_friends.indexOf(profileid) == -1 && req_friends.indexOf(profileid) !== -1) {
      button = <button className="friend-button" onClick={this.handleFriend}>Pending</button>;
    }

    return (
      <div>
        {button}
      </div>
    );
  },


});

module.exports = FriendRequestItem;

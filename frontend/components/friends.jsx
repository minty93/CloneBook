var React = require("react");
var UserApiUtil = require('../util/users_api_util');
var PostsApiUtil = require('../util/posts_api_util');
var UserStore = require("../stores/UserStore");
var PostStore = require("../stores/PostStore");
var CommentStore = require("../stores/CommentStore");
var PostsForm = require('./PostsForm');
var PostIndexItem = require('./PostsIndexItem');
var PostsForm = require('./PostsForm');
var CoverForm = require('./user_cover_form');
var ProfileForm = require('./user_profile_form');
var Navbar = require('./navbar');
var Link = require('react-router').Link;




var Friends = React.createClass({

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
    var userId = this.props.userId || this.props.params.userId;
    var user = this._findUserById(userId);
    return { user: user};
  },

  componentDidMount: function () {
    var userId = (this.props.userId || this.props.params.userId);
    this.listener = UserStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function(newProps){
    UserApiUtil.fetchAllUsers();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {
    var userId = this.props.params.userId;
    var user = this._findUserById(userId);
    if (this.isMounted()) {
    this.setState({ user: user});
    }
 },

  render: function() {
    var findfriends = [];
    var friends;
    if (this.state.user) {
      friend_ids = this.state.user.friends
      for (var i = 0; i < friend_ids.length; i++) {
        if (friend_ids[i].requestee_id != friend_ids[i].requester_id)
        {
          debugger
          findfriends.push(this._findUserById(friend_ids[i].requestee_id ))
        }
      }
    }


    if (findfriends) {

    friends = findfriends.map(function(friend){
      <Link to={`users/${friend.id}`}>
      <img src={this.friend.profile_pic}/>
      </Link>
    })
  }


    return (
      <div>
        <Navbar params={this.props.params} user={this.state.user}/>
        {friends}
      </div>

    );


  },

});
module.exports = Friends;

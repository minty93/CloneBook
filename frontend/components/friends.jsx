var React = require("react");
var UserApiUtil = require('../util/users_api_util');
var PostsApiUtil = require('../util/posts_api_util');
var UserStore = require("../stores/UserStore");
var PostStore = require("../stores/PostStore");
var CommentStore = require("../stores/CommentStore");
var PostsForm = require('./PostsForm');
var PostIndexItem = require('./PostsIndexItem');
var PostsForm = require('./PostsForm');
var Link = require('react-router').Link;
var FriendButton = require('./friend_request_item');
var CoverForm = require('./user_cover_form');
var ProfileForm = require('./user_profile_form');
var Navbar = require('./navbar');
var CurrentUserStore = require('./../stores/current_user_store');





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
    UserApiUtil.fetchAllUsers();
  },

  componentWillReceiveProps: function(newProps){
    UserApiUtil.fetchAllUsers();
  },

  componentWillUnmount: function () {
    if (this.isMounted()) {
      this.listener.remove();
    }
  },

  _onChange: function () {
  var userId = this.props.params.userId;
  var user;
  UserApiUtil.fetchUser(parseInt(this.props.params.userId), function (user){
      if (this.isMounted()) {
      this.setState({ user: user});
      }
    }.bind(this)
  );
 },

 //
 //   friend_ids = this.state.user.friends
 //   for (var i = 0; i < friend_ids.length; i++) {
 //     if (friend_ids[i].requestee_id != friend_ids[i].requester_id)
 //     {
 //       findfriends.push((friend_ids[i]))
 //     }
 //   }
 // }
  render: function() {
    var received_posts;
    var cover_form;
    var profile_form;

    var findfriends = [];
    var friends =[];

    if (this.state.user) {
      var rec_friends =[];
      this.state.user.received_friends.forEach(function(friend){
        rec_friends.push(friend.requester_id);}
      );
      var req_friends = [];

      this.state.user.requested_friends.forEach(function(friend){
        req_friends.push(friend.requestee_id);
      }
    );

    if (this.state.user.id == CurrentUserStore.user().id){
      cover_form = <CoverForm className="fullpage" params={this.props.params}/>
      profile_form = <ProfileForm className="fullpage" params={this.props.params}/>

    }

    req_friends.forEach(function(friend_id)
      {
        if (rec_friends.indexOf(friend_id) !== -1) {
          findfriends.push(friend_id);
        }
      }
    );


    if (findfriends) {
      var that = this;
    friends = findfriends.map(function(friend_id){
      friend = that._findUserById(friend_id);
      return (
        <div className="friend-list group">
        <Link to={`users/${friend_id}`}>
        <h2>{friend.fname}</h2>
        <img src={friend.profile_pic} className="friend-image"/>
        </Link>
      </div>);
    });
  }



    return (
      <div className="friends group">
        <Navbar params={this.props.params} user={this.state.user}/>
        {cover_form}
        {profile_form}
        <div className="friends-header group"><i className="fa fa-users fa-3x"></i><h2>Friends</h2>
        </div>
        {friends}
      </div>

    );


  }
},

});
module.exports = Friends;

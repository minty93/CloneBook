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


function _getRelevantPosts(userId) {
  return PostStore.getByUserId(userId);
}




var UserProfile = React.createClass({

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
    var userId = this.props.params.userId;
    var user = this._findUserById(userId);
    return { user: user};
  },

  componentDidMount: function () {
    this.listener = UserStore.addListener(this._onChange);
    this.listener = PostStore.addListener(this._onChange);
    this.listener = CommentStore.addListener(this._onChange);
    UserApiUtil.fetchUser(parseInt(this.props.params.userId));
  },

  componentWillReceiveProps: function(newProps){
    UserApiUtil.fetchUser(parseInt(newProps.params.userId));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {
    var userId = this.props.params.userId;
    var user = this._findUserById(userId);
    this.setState({ user: user});
 },

  render: function() {
    var fname;
    var received_posts;
    var cover_pic;
    var profile_pic;

    if (this.state.user) {
      received_posts = this.state.user.received_posts;
      fname = this.state.user.fname;
      received_posts = received_posts.reverse().map(function(post) {
        return (<PostIndexItem post={post} ></PostIndexItem>);
      });
      cover_pic =   <img className="cover-image" src={this.state.user.cover_pic} />;
      profile_pic =   <img className="profile-image" src={this.state.user.profile_pic} />;
    }


    return (
      <div>
        <div className="photo-form">
        <CoverForm params={this.props.params}/>
        <ProfileForm params={this.props.params}/>
        </div>
      <h3>{fname}</h3>
      {cover_pic}
      {profile_pic}
      <PostsForm params={this.props.params}/>
      {received_posts}
      </div>
    );


  },

});
module.exports = UserProfile;

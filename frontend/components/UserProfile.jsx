var React = require("react");
var UserApiUtil = require('../util/users_api_util');
var PostsApiUtil = require('../util/posts_api_util');
var UserStore = require("../stores/UserStore");
var PostStore = require("../stores/PostStore");
var PostsForm = require('./PostsForm');
var UserPostsIndex = require('./user_posts/UserPostsIndex');

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
    // PostsApiUtil.fetchAllPosts();
    var userId = this.props.params.userId;
    var user = this._findUserById(userId);
    var posts = _getRelevantPosts(userId);
    return { user: user, posts: posts };
  },

  componentDidMount: function () {
    this.listener = UserStore.addListener(this._onChange);
    UserApiUtil.fetchUser(parseInt(this.props.params.userId));
  },

  componentWillReceiveProps: function(newProps){
    PostsApiUtil.fetchAllPosts();
    UserApiUtil.fetchUser(parseInt(newProps.params.userId));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {
    var userId = this.props.params.userId;
    var user = this._findUserById(userId);
    var posts = _getRelevantPosts(userId);
    debugger
    this.setState({ user: user, posts: posts });
 },

  render: function() {
    debugger
    if (typeof this.state.user !== "undefined") {
      return (
        <div className="user-profile">
          <h1>{ this.state.user.fname }</h1>
          <UserPostsIndex posts={this.state.posts}/>
        </div>
      );
    } else {
      return <div>NO USER</div>;
    }

  },

});
module.exports = UserProfile;

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
var PhotoIndex = require('./photos/photo_index');
var ImageForm = require('./photos/image_form');
var Navbar = require('./navbar');



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
    var userId = this.props.userId || this.props.params.userId;
    var user = this._findUserById(userId);
    return { user: user};
  },

  componentDidMount: function () {
    var userId = (this.props.userId || this.props.params.userId);
    this.listener = UserStore.addListener(this._onChange);
    // this.listener = PostStore.addListener(this._onChange);
    // this.listener = CommentStore.addListener(this._onChange);
    UserApiUtil.fetchUser(parseInt(userId));
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
    if (this.isMounted()) {
    this.setState({ user: user});
    }
 },

  render: function() {
    var received_posts;

    if (this.state.user) {
      if(this.state.user.received_posts){
      received_posts = this.state.user.received_posts.slice(0);
      fname = this.state.user.fname;
      received_posts = received_posts.reverse().map(function(post) {
        return (<PostIndexItem post={post} key={post.id}/>);
      });
    }
      cover_pic =   <img className="cover-image" src={this.state.user.cover_pic} />;
      profile_pic =   <img className="profile-image" src={this.state.user.profile_pic} />;
    }


    return (
      <div>
      <Navbar params={this.props.params} user={this.state.user}/>
      <div className="posts-index-profilefeed">
      <PostsForm params={this.props.params} placeholder="Post Something"/>
      {received_posts}
      </div>
      </div>
    );


  },

});
module.exports = UserProfile;

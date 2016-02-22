var React = require("react");
var UserApiUtil = require('../util/users_api_util');
var PostsApiUtil = require('../util/posts_api_util');
var UserStore = require("../stores/UserStore");
var PostStore = require("../stores/PostStore");
var CommentStore = require("../stores/CommentStore");
var PostsForm = require('./PostsForm');
var PostIndexItem = require('./PostsIndexItem');
var PostsForm = require('./PostsForm');
var FriendButton = require('./friend_request_item');
var CoverForm = require('./user_cover_form');
var ProfileForm = require('./user_profile_form');
var PhotoIndex = require('./photos/photo_index');
var ImageForm = require('./photos/image_form');
var Navbar = require('./navbar');
var CoverForm = require('./user_cover_form');
var ProfileForm = require('./user_profile_form');
var Header = require("./header");
var CurrentUserStore = require('./../stores/current_user_store');




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
    UserApiUtil.fetchUser(parseInt(userId));
    if(this._findUserById(userId) != undefined){var user = this._findUserById(userId)};
    return { user: user};
  },

  componentDidMount: function () {
    var userId = (this.props.userId || this.props.params.userId);
    this.listener = UserStore.addListener(this._onChange);
    UserApiUtil.fetchUser(parseInt(userId), function(user){
      this.setState({user: user})
    }.bind(this));
  },

  componentWillReceiveProps: function(newProps){
    UserApiUtil.fetchUser(parseInt(newProps.params.userId), function (user){
      if (this.isMounted()) {
      this.setState({ user: user});
      }
      }.bind(this)
    );
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
    // this._findUserById(userId);
 },

  render: function() {

    var received_posts;
    var navbar;
    var cover_form;
    var profile_form;

    if (this.state.user) {
      if(this.state.user.received_posts){
      received_posts = this.state.user.received_posts.slice(0);
      fname = this.state.user.fname;
      navbar =  <Navbar params={this.props.params} user={this.state.user}/>;
      received_posts = received_posts.reverse().map(function(post) {
        return (<PostIndexItem post={post} key={post.id}/>);
      });
    }
    if (this.state.user.id == CurrentUserStore.user().id){
      cover_form = <CoverForm className="fullpage" params={this.props.params}/>
      profile_form = <ProfileForm className="fullpage" params={this.props.params}/>

    }

      cover_pic =   <img className="cover-image" src={this.state.user.cover_pic} />;
      profile_pic =   <img className="profile-image" src={this.state.user.profile_pic} />;
    }


    return (
      <div >

        <div className="profile-page">
        {navbar}
        <FriendButton params={this.props.params}/>
            <div className="posts-index-profilefeed">
            <PostsForm params={this.props.params} placeholder="Post Something"/>
            {received_posts}
            </div>
        </div>
      </div>
    );


  },

});
module.exports = UserProfile;

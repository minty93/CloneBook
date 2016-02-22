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
var CurrentUserStore = require('./../stores/current_user_store');




var About = React.createClass({

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
    UserApiUtil.fetchAllUsers();
  },

  componentWillUnmount: function () {
    this.listener.remove();
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

  render: function() {
    var received_posts;
    var cover_form;
    var profile_form;

    if (this.state.user) {
      birthday = this.state.user.birthday;
      gender = this.state.user.gender;
      fname = this.state.user.fname;
      lname = this.state.user.lname;
      email = this.state.user.email;


    }

    if (this.state.user.id == CurrentUserStore.user().id){
      cover_form = <CoverForm className="fullpage" params={this.props.params}/>
      profile_form = <ProfileForm className="fullpage" params={this.props.params}/>

    }


    return (
      <div>
      <Navbar params={this.props.params} user={this.state.user}/>
      <ul className="about-feed">

        <div className="group"><i className="fa fa-user fa-3x"></i><h2>About</h2></div>
        <div className="about-list">
        <li>Name: {fname} {lname}</li>
        <li>Birthday: {birthday}</li>
        <li>Email: {email}</li>
        <li>Gender: {gender}</li>
      </div>
      </ul>
      </div>
    );


  },

});
module.exports = About;

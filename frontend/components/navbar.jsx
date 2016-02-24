var React = require('react');
var CurrentUserStore = require('./../stores/current_user_store');
var SessionsApiUtil = require('./../util/sessions_api_util');
var Search = require('./search');
var History = require('react-router').History;
var Link = require('react-router').Link;
var CoverForm = require('./user_cover_form');
var ProfileForm = require('./user_profile_form');
var FriendButton = require('./friend_request_item');
var LocalStorageMixin = require('react-localstorage');
var CoverForm = require('./user_cover_form');
var ProfileForm = require('./user_profile_form');
var Navbar = require('./navbar');
var UserStore = require('./../stores/UserStore');
var UserApiUtil = require('../util/users_api_util');






var Navbar = React.createClass({
  _findUserById: function(id) {
    id = parseInt(id);
    var users = UserStore.all();
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
    var userId = (newProps.params.userId);
    UserApiUtil.fetchUser(parseInt(userId), function (user){
        if (this.isMounted()) {
        this.setState({ user: user});
        }
      }.bind(this)
    );
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


  render: function(){
    var fname;
    var cover_pic;
    var profile_pic;
    var cover_form;
    var profile_form;

    if (this.props.user) {
      fname = this.props.user.fname;
      var lname = this.props.user.lname;
      cover_pic =   <img className="cover-image" src={this.props.user.cover_pic} />;
      profile_pic =   <img className="profile-image" src={this.props.user.profile_pic} />;
    }

    if (this.state.user.id == CurrentUserStore.user().id){
      cover_form = <CoverForm className="fullpage" params={this.props.params}/>
      profile_form = <ProfileForm className="fullpage" params={this.props.params}/>

    }


    return (
      <div group>
      <div className="profile">
        <div className="photo-form">
        {cover_pic}
        {profile_pic}
        {cover_form}
        {profile_form}
        </div>
        <h3>{fname} {lname}</h3>
        <ul className="profile-nav group">
        <Link to={`users/${this.props.params.userId }/timeline`}>Timeline</Link>
        <Link to={`users/${this.props.params.userId }/about`}>About</Link>
        <Link to={`users/${this.props.params.userId }/friends`}>Friends</Link>
        <Link to={`users/${this.props.params.userId }/photos`}>Photos</Link>
        </ul>
      </div>
      </div>
    );
  }
});

module.exports = Navbar;

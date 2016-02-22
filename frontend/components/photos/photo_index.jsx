var React = require("react");
var ImagesApiUtil = require('../../util/images_api_util');
var PhotoIndexItem = require('./photo_index_item.jsx');
var ImageForm = require('./image_form.jsx');
var Navbar = require('./../navbar');
var UserStore = require("../../stores/UserStore");
var UserApiUtil = require('../../util/users_api_util');
var CurrentUserStore = require('../../stores/current_user_store');
var CoverForm = require('./../user_cover_form');
var ProfileForm = require('./../user_profile_form');




var PhotoIndex = React.createClass({

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
  render: function () {
    var photoIndex;
    var photoform = <div></div>;
    var cover_form;
    var profile_form;
    if(this.state.user){
    photoIndex = this.state.user.photos.map(function(photo, index) {
      return (
        <PhotoIndexItem key={index} photo={photo}/>
      );
    });
  }

  if (this.state.user.id == CurrentUserStore.user().id){
    cover_form = <CoverForm className="fullpage" params={this.props.params}/>
    profile_form = <ProfileForm className="fullpage" params={this.props.params}/>

  }

  if (currentUser.id == this.props.params.userId) {
    photoform = <ImageForm className="photo-form" user={this.state.user}></ImageForm>;
  }
    return (
      <div className="group">
        <Navbar params={this.props.params} user={this.state.user}/>
  
      <div className="cry">
        {photoform}
        <ul key={33} className="photo-index group">
          {photoIndex}
        </ul>
      </div>
      </div>
    );
  },

});

module.exports = PhotoIndex;

var React = require('react');
var CurrentUserStore = require('./../stores/current_user_store');
var SessionsApiUtil = require('./../util/sessions_api_util');
var Search = require('./search');
var History = require('react-router').History;
var Link = require('react-router').Link;
var CoverForm = require('./user_cover_form');
var ProfileForm = require('./user_profile_form');
var FriendButton = require('./friend_request_item');




var Navbar = React.createClass({

  componentWillReceiveProps: function(newProps){
    this.forceUpdate();
  },


  _onChange: function () {
    this.forceUpdate();
  },


  render: function(){
    var fname;
    var cover_pic;
    var profile_pic;

    if (this.props.user) {
      fname = this.props.user.fname;
      cover_pic =   <img className="cover-image" src={this.props.user.cover_pic} />;
      profile_pic =   <img className="profile-image" src={this.props.user.profile_pic} />;
    }


    return (
      <div className="profile">
        <CoverForm params={this.props.params}/>
        <ProfileForm params={this.props.params}/>
        <div className="photo-form">
        <h3>{fname}</h3>
        {cover_pic}
        {profile_pic}
        </div>
        <ul className="profile-nav group">
        <Link to={`users/${this.props.params.userId }/timeline`}>Timeline</Link>
        <Link to={`users/${this.props.params.userId }/about`}>About</Link>
        <Link to={`users/${this.props.params.userId }/friends`}>Friends</Link>
        <Link to={`users/${this.props.params.userId }/photos`}>Photos</Link>
        </ul>
      </div>
    );
  }
});

module.exports = Navbar;
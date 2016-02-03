var React = require('react');
var CurrentUserStore = require('./../stores/current_user_store');
var SessionsApiUtil = require('./../util/sessions_api_util');
var Search = require('./search');
var History = require('react-router').History;
var Link = require('react-router').Link;
var CoverForm = require('./user_cover_form');
var ProfileForm = require('./user_profile_form');



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
        <div className="photo-form">
        <h3>{fname}</h3>
        <CoverForm params={this.props.params}/>
        {cover_pic}
        <ProfileForm params={this.props.params}/>
        {profile_pic}
        </div>
      </div>
    );
  },

});

module.exports = Navbar;

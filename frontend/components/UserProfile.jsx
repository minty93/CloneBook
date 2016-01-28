var React = require("react");
var UserApiUtil = require('../util/users_api_util');
var UserStore = require("../stores/UserStore");
var PostsForm = require('./PostsForm');
var PostsIndex = require('./PostsIndex');


var UserProfile = React.createClass({

  getInitialState: function(){
    var userId = this.props.params.userId;
    var user = this._findUserById(userId) || {} ;
    return { user: user };
  },

  _findUserById: function (id) {
     var res;
     UserStore.all().forEach(function (user) {
      if (id == user.id) {
        res = user;
      }
    }.bind(this));
     return res;
  },

  componentDidMount: function () {
    this.listener = UserStore.addListener(this._onChange);
    UserApiUtil.fetchAllUsers();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {
   var userId = this.props.params.userId;
   var user = this._findUserById(userId);
   this.setState({ user: user });
 },

  render: function() {
    return (
      <div className="user-profile">
        <h1>{this.state.user.fname}</h1>
        <PostsIndex params={this.props.params}/>
      </div>
    );
  },

});
module.exports = UserProfile;

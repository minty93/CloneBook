var React = require('react');
var CurrentUserStore = require('./../stores/current_user_store');
var SessionsApiUtil = require('./../util/sessions_api_util');
var Search = require('./search');
var History = require('react-router').History;
var Link = require('react-router').Link;



var Header = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      currentUser: CurrentUserStore.currentUser()
    };
  },

  componentDidMount: function () {
    this.listener = CurrentUserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listener.remove();
 },


  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser()});
  },

  logout: function (e) {
    e.preventDefault();
    SessionsApiUtil.logout(function () {
      this.history.pushState({}, "/login");
    }.bind(this));
  },


  render: function() {

    if (CurrentUserStore.isLoggedIn()) {
      currentUser = CurrentUserStore.user()
      return (
        <div className="main-header">
          Logged in as { this.state.currentUser.email }
          
          <button onClick={ this.logout }> LOG OUT</button>
          <Link to={`/`}>Home</Link>
          <Link to={`users/${currentUser.id}`}>{currentUser.fname}</Link>
          <Search/>
        </div>
      );
    } else {
      return (
        <div>
          <a href="#/login">Login</a>
        </div>
      );
    }

  },

});

module.exports = Header;

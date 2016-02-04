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
        <div className="main-header group">
          <img src="http://s22.postimg.org/7wbexk3cx/Screen_Shot_2016_02_02_at_9_23_29_PM.png" className="side-logo"/>
          <ul className="main-links group">
          <li className="logged-in">Logged in as { this.state.currentUser.email }<img src={this.state.currentUser.profile_pic} className= "side-logo"/></li>
          <li className="searchbar"><Search className="search"/></li>

          <li><Link to={`/`}>Home</Link></li>
          <li><Link to={`users/${currentUser.id}`}>{currentUser.fname}</Link></li>
          <li><button onClick={ this.logout }> LOG OUT</button></li>
          </ul>
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

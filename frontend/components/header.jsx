var React = require('react');
var CurrentUserStore = require('./../stores/current_user_store');
var SessionsApiUtil = require('./../util/sessions_api_util');
var Search = require('./search');
var History = require('react-router').History;
var Link = require('react-router').Link;
var UserApiUtil = require('../util/users_api_util');




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

 componentWillReceiveProps: function(){
    this._onChange();

 },


  _onChange: function () {
    if (this.isMounted() && CurrentUserStore.user().id) {
      UserApiUtil.fetchUser(parseInt(CurrentUserStore.user().id), function (user){
        this.setState({currentUser: user});
      }.bind(this)
    );
  }
  },

  logout: function (e) {
    e.preventDefault();
    SessionsApiUtil.logout(function () {
      this.history.pushState({}, "/login");
    }.bind(this));
  },


  render: function() {

    if (CurrentUserStore.isLoggedIn()) {
      var currentUser = CurrentUserStore.user()
      return (
        <div className="main-header group">
          <Link className="link" to={`/`}>
          <img src="http://s22.postimg.org/7wbexk3cx/Screen_Shot_2016_02_02_at_9_23_29_PM.png" className="side-logo"/></Link>
          <ul className="main-links group">
          <li className="searchbar"><Search className="search"/></li>

          <li><Link className="link" to={`/`}>Home</Link></li>
          <li className="logged-in">
          <Link className="link" to={`users/${currentUser.id}`}><img src={this.state.currentUser.profile_pic} />{currentUser.fname}</Link></li>
          <li><button onClick={ this.logout }> Log Out</button></li>
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

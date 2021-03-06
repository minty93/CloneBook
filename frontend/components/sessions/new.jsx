var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../../util/sessions_api_util');
var UsersApiUtil = require('./../../util/users_api_util');
import SignUpForm from './sign_up';

var SessionForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();

    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  userCreate: function (user) {
    UsersApiUtil.createUser(user, function () {
      this.history.pushState({}, "/");
    }.bind(this));
    UsersApiUtil.fetchAllUsers();
  },

  render: function() {

    return (
      <div classNameName="wrapper">
        <header className="header group">

        <label>CloneBook</label>


        <form onSubmit={ this.submit } className="login-form group">
          <div className="login">

          <label className="email">
            Email
            <input type="text" name="email" />
          </label>

          <label className="password">
            Password
            <input type="password" name="password" />
          </label>

          <button className="login-button">Log In</button>

          </div>
        </form>

        <form onSubmit={this.submit} className="guest-login">
          <input type="hidden" name="email" value="guest"/>
          <input type="hidden" name="password" value="password"/>
          <button className="guest">Guest Login</button>
        </form>
        </header>


        <div className="main group">

          <section className="sidebar group">
            <h2>Connect all around the Universe on CloneBook</h2>
            <ul>
          <li><i className="fa fa-newspaper-o fa-4x"></i>See photos and updates</li>
          <li><i className="fa fa-laptop fa-4x"></i>Share whats new</li>
            <li><i className="fa fa-heart-o fa-4x"></i>Discover more</li>
            </ul>
          </section>


          <section className="main-content group">
          <h3>Sign Up</h3>

          <SignUpForm submit={this.userCreate} />

          </section>

        </div>
      </div>
    );
  },

});

module.exports = SessionForm;

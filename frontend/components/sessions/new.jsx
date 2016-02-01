var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../../util/sessions_api_util');
var UsersApiUtil = require('./../../util/users_api_util');

var SessionForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();

    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  userCreate: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    UsersApiUtil.createUser(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
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
              <li>See photos and updates</li>
              <li>Share whats news</li>
              <li>Discover more</li>
            </ul>
          </section>


          <section className="main-content group">
          <h3>Sign Up</h3>

          <form onSubmit={this.userCreate} className="signup group">

            <label>
              First Name
              <input type="text" name="fname" />
            </label>

            <label>
              Last Name
              <input type="text" name="lname" />
            </label>

            <br/>

            <label>
              Email
              <input type="text" name="email" />
            </label>

            <label>
              Password
              <input type="password" name="password"/>
            </label>

            <br/>

            <label>Birthday<input type="date" name="birthday"/></label>
            <br/>
            <label>
              Gender
              <input type="radio" name="gender" value="male"/> Male
              <input type="radio" name="gender" value="female"/> Female<br/>
            </label>

            <input type="submit" value="Sign Up"/>
          </form>
          </section>

        </div>
      </div>
    );
  },

});

module.exports = SessionForm;

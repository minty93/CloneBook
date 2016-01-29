var React = require('react');
var History = require('react-router').History;
var UsersStore = require('../stores/UserStore');
var UsersApiUtil = require('../util/users_api_util');

var UserForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    UsersApiUtil.createUser(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function() {

    return (
      <form onSubmit={ this.submit }>

        <h1>Sign Up!</h1>

        <label>
          Email
          <input type="text" name="email" />
        </label>

        <label>
          Password
          <input type="password" name="password" />
        </label>


        <label>
          Fname
          <input type="text" name="fname" />
        </label>

        <label>
          Lname
          <input type="text" name="lname" />
        </label>

        <label>Birthday<input type="date" name="birthday"/></label>
        <br/>
        <label>
          Gender
          <input type="radio" name="gender" value="male" checked/> Male
          <input type="radio" name="gender" value="female"/> Female<br/>
        </label>

        <button>Join!</button>
      </form>
    );
  },

});

module.exports = UserForm;

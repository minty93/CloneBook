var React = require('react'),
    Header = require("./header"),
    SessionsApiUtil = require('./../util/sessions_api_util'),
    CurrentUserStore = require("./../stores/current_user_store");

var App = React.createClass({
  componentDidMount: function () {
    this.Listener = CurrentUserStore.addListener(this.forceUpdate.bind(this));
    SessionsApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
		this.Listener.remove();
	},

  render: function() {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>PLEASE WAIT</p>;
    }


    return (
      <div>
        <Header />
        { this.props.children }
      </div>
    );
  },

});

module.exports = App;

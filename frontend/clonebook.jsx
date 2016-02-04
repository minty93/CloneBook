var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var PostsForm = require('./components/PostsForm');
var PostsIndex = require('./components/PostsIndex');
var UserProfile = require('./components/UserProfile');
var CommentsForm = require('./components/CommentsForm');
var App = require('./components/app');
var SessionForm = require('./components/sessions/new');
var UserForm = require('./components/user_form');
var CurrentUserStore = require('./stores/current_user_store');
var SessionsApiUtil = require('./util/sessions_api_util');
var UsersIndex = require('./components/users_index');
var About = require('./components/about');
var Friends = require('./components/friends.jsx');
var PhotoIndex = require('./components/photos/photo_index.jsx');




// var App = React.createClass({
//   render: function(){
//
//     return (
//       <div>
//         <h3 className="header-bar">Temporary HeaderBar</h3>
//         {this.props.children}
//       </div>
//     );
//   }
// });


 var _ensureLoggedOut = function (nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfLoggedIn);
  }

  function _redirectIfLoggedIn () {
    if (CurrentUserStore.isLoggedIn()) {
      replace({}, "/");
    }
    callback();
  }
};



function _ensureLoggedIn(nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched() === true) {
    _redirectIfNotLoggedIn();
  }
  else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/login");
    }
    callback();
  }
}

var router = (
  <Router>
  <Route path="/" component={App} onEnter={_ensureLoggedIn}>
  <IndexRoute component={ PostsIndex}/>
  <Route path="users/new" component={ UserForm } />
  <Route path="posts/new" component={PostsForm}/>
  <Route path="users/:userId" component={UserProfile}/>
  <Route path="users/:userId/timeline" component={UserProfile}/>
  <Route path="users/:userId/about" component={About}/>
  <Route path="users/:userId/photos" component={PhotoIndex}/>
  <Route path="users/:userId/friends" component={Friends}/>
  </Route>
  <Route path="login" component={SessionForm} onEnter={_ensureLoggedOut}/>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  if (root) {
    ReactDOM.render(router, root);
  }
});

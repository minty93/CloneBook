var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var PostsForm = require('./components/PostsForm');
var PostsIndex = require('./components/PostsIndex');



var App = React.createClass({
  render: function(){
    return (
      <div>
        <h3>I made it here and am rendering</h3>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex}/>
    <Route path="posts/new" component={PostsForm}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root')
  );
});

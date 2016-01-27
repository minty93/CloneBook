var React = require("react");
var PostStore = require("../stores/PostStore");

var PostsIndexItems = React.createClass({
  getInitialState: function(){
    return {};
  },

  componentDidMount: function() {
    this.listener = PostStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {
    return (
      <div className="post-index-items">
        <h1 className="title">Post</h1>
        <ul >
          <li>{this.props.post.body}</li>
        </ul>
      </div>
    );
  },

  _onChange: function() {
    this.setState();
  }

});

module.exports = PostsIndexItems;

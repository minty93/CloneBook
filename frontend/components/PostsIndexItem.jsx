var React = require("react");
var PostStore = require("../stores/PostStore");

var PostsIndexItems = React.createClass({


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



});

module.exports = PostsIndexItems;

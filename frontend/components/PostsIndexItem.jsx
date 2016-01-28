var React = require("react");
var PostStore = require("../stores/PostStore");

var PostsIndexItems = React.createClass({


  render: function() {
    return (
      <div >
        <ul className="post-index-items">
        <h1 className="title">posted</h1>
          <li className="actual-post">{this.props.post.body}</li>
        </ul>
      </div>
    );
  },



});

module.exports = PostsIndexItems;

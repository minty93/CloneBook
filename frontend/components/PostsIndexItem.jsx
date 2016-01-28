var React = require("react");
var PostStore = require("../stores/PostStore");
var PostsApiUtil = require('../util/posts_api_util');
var PostsIndexItems = React.createClass({


  render: function() {
    return (
      <div >
        <ul className="post-index-items">
          <h1 className="title">{this.props.post.author_name} posted</h1>
          <li className="actual-post">{this.props.post.body}</li>
          <button onClick={this.handleDelete}>Delete Post</button>
        </ul>
      </div>
    );
  },

  handleDelete: function(e){
    e.preventDefault();
    var that = this;
    PostsApiUtil.destroyPost(this.props.post.id);
  },




});

module.exports = PostsIndexItems;

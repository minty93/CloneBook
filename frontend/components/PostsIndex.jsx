var React = require("react");
var PostStore = require("../stores/PostStore");
var PostsIndexItem = require('./PostsIndexItem');
var PostsApiUtil = require('../util/posts_api_util');


var PostsIndex = React.createClass({
  getInitialState: function(){
    return {posts: PostStore.all()};
  },

  componentDidMount: function() {
    PostsApiUtil.fetchAllPosts();
    this.listener = PostStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {
    return (
      <div>
        <h1 className="title">Posts</h1>
        <ul className="posts-index">
          {
            this.state.posts.map(function(post) {
              return <PostsIndexItem key={post.id} post={post} />;
            })
          }
        </ul>
      </div>
    );
  },

  _onChange: function() {
    this.setState({ posts: PostStore.all() });
  }

});


module.exports = PostsIndex;

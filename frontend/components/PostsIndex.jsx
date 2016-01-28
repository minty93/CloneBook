var React = require("react");
var PostStore = require("../stores/PostStore");
var PostsIndexItem = require('./PostsIndexItem');
var PostsApiUtil = require('../util/posts_api_util');
var PostsForm = require('./PostsForm');



var PostsIndex = React.createClass({
  getInitialState: function(){
    return {posts: PostStore.all()};
  },

  componentDidMount: function() {
    this.listener = PostStore.addListener(this._onChange);
    PostsApiUtil.fetchAllPosts();
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {
    return (
      <div>
        <h1 className="title">Posts</h1>
        <PostsForm location={this.props.location}/>
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

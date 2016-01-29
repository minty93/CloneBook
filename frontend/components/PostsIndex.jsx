var React = require("react");
var PostStore = require("../stores/PostStore");
var PostsIndexItem = require('./PostsIndexItem');
var PostsApiUtil = require('../util/posts_api_util');
var PostsForm = require('./PostsForm');
var CommentsForm = require('./CommentsForm');



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
      <div className="newsfeed">
        <ul className="posts-index">
        <li><CommentsForm/></li>
        <li><PostsForm params={this.props.params}/></li>
          <li>
            {
              this.state.posts.map(function(post) {
              return(
              <div>
                <PostsIndexItem key={post.id} post={post}/>
              </div>);
            })
          }</li>
        </ul>
      </div>
    );
  },

  _onChange: function() {
    this.setState({ posts: PostStore.all() });
  }

});


module.exports = PostsIndex;

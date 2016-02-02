var React = require("react");
var PostStore = require("../stores/PostStore");
var CommentStore = require("../stores/CommentStore");
var PostsIndexItem = require('./PostsIndexItem');
var PostsApiUtil = require('../util/posts_api_util');
var PostsForm = require('./PostsForm');
var CommentsForm = require('./CommentsForm');
var CommentsIndexItem = require('./CommentsIndexItem');



var PostsIndex = React.createClass({

  getInitialState: function(){
    return {posts: PostStore.all()};
  },

  componentWillMount: function() {
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
        <li><PostsForm params={this.props.params}/></li>
          <li>
            {
              this.state.posts.slice(0).reverse().map(function(post,index) {
              return(
              <div className="post-box">
                <PostsIndexItem key={index} post={post}/>
              </div>);
            })
          }</li>
        </ul>
      </div>
    );
  },

  _onChange: function() {
    if (this.isMounted()) {
    this.setState({posts: PostStore.all()});
    }
  }

});


module.exports = PostsIndex;

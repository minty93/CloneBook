var React = require("react");
var PostStore = require("../stores/PostStore");
var CommentStore = require("../stores/CommentStore");
var PostsIndexItem = require('./PostsIndexItem');
var PostsApiUtil = require('../util/posts_api_util');
var UserApiUtil = require('../util/users_api_util');
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
    UserApiUtil.fetchAllUsers();
  },


  componentWillUnmount: function() {
    this.listener.remove();
  },




  render: function() {
    return (
      <div className="main-page group">
      <div className="newsfeed">
        <ul className="posts-index">
        <li><PostsForm params={this.props.params} placeholder="What's on your mind?"/></li>
          <li>
            {
              this.state.posts.slice(0).reverse().map(function(post,index) {
              return(
              <div className="post-box">
                <PostsIndexItem key={post.id} post={post}/>
              </div>);
            })
          }</li>
        </ul>
      </div>
      <div className="ads group">
        <a href="http://www.appacademy.io/"><img src="http://s13.postimg.org/7sb4gw4mv/1441509975_1.jpg"/></a>
        <a href="http://www.github.com/"><img src="http://cdn.inquisitr.com/wp-content/uploads/2015/05/Github.jpg"/></a>
        <a href="https://slack.com/"><img src="http://cdn.churchm.ag/wp-content/uploads/2015/03/Slack-Logoness-750x431.png"/></a>
      </div>
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

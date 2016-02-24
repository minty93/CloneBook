var React = require("react");
var PostStore = require("../stores/PostStore");
var CommentStore = require("../stores/CommentStore");
var PostsIndexItem = require('./PostsIndexItem');
var PostsApiUtil = require('../util/posts_api_util');
var UserApiUtil = require('../util/users_api_util');
var PostsForm = require('./PostsForm');
var CommentsForm = require('./CommentsForm');
var CommentsIndexItem = require('./CommentsIndexItem');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var  Header = require("./header");




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
        <li ><PostsForm params={this.props.params} placeholder="What's on your mind?"/></li>
          <li >
            {
              this.state.posts.slice(0).reverse().map(function(post,index) {
              return(
              <ReactCSSTransitionGroup key={post.id} transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              <div className="post-box">
                <PostsIndexItem post={post}/>
              </div>
            </ReactCSSTransitionGroup>
            );
            })
          }</li>
        </ul>
      </div>
      <div className="ads group">
      <a href="https://www.aarushijain.me/"><img src="http://s12.postimg.org/xz0xjn0v1/Screen_Shot_2016_02_24_at_3_27_44_PM.png"/></a>
        <a href="http://www.github.com/minty93"><img src="http://cdn.inquisitr.com/wp-content/uploads/2015/05/Github.jpg"/></a>
        <a href="http://www.appacademy.io/"><img src="http://s30.postimg.org/wvcuhclo1/1441118500_app_academy.png"/></a>
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

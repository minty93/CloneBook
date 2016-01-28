var React = require("react");
var PostStore = require("../stores/PostStore");
var PostsApiUtil = require('../util/posts_api_util');
var PostsIndexItems = React.createClass({

 //  getInitialState: function(){
 //    var postId = this.props.post.id;
 //    var post = this._findPostById(postId) || {} ;
 //    return { post: post };
 //  },
 //
 //  _findPostById: function (id) {
 //     var res;
 //     PostStore.all().forEach(function (post) {
 //      if (id == post.id) {
 //        res = post;
 //      }
 //    }.bind(this));
 //     return res;
 //  },
 //
 //  componentDidMount: function () {
 //    this.listener = PostStore.addListener(this._onChange);
 //  },
 //
 //  componentWillUnmount: function () {
 //    this.listener.remove();
 //  },
 //
 //  _onChange: function () {
 //   var postId = this.props.post.postId;
 //   var post = this._findPostById(this.state.post.id);
 //   this.setState({ post: post });
 // },


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

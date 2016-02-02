var React = require("react");
var PostStore = require("../stores/PostStore");
var PostsApiUtil = require('../util/posts_api_util');
var CommentsForm = require('./CommentsForm');
var CommentsIndexItem = require('./CommentsIndexItem');
var UserApiUtil = require('../util/users_api_util');

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
    var comments;
    var profile_pic;

    if(this.props.post.comments){
      <li>
        {
          comments = this.props.post.comments.map(function(comment) {
            return(
              <div>
                <CommentsIndexItem key={comment.id} comment={comment}/>
              </div>);
            })
          }</li>;
        }

      if(this.props.post.author && this.props.post.author.profile_pic){
        profile_pic = this.props.post.author.profile_pic.url;
      }
      else {
        profile_pic = "http://s29.postimg.org/mt68s3j5z/star_wars_profile_pic.jpg";
      }



    return (
      <div >
        <ul className="post-index-items group">
        <li><button onClick={this.handleDelete}>Delete Post</button></li>
          <img className="small-image" src={profile_pic} />
          <h1 className="title">{this.props.post.author_name} posted</h1>
          <li className="actual-post">{this.props.post.body}</li>
        </ul>
        <ul>
        {comments}
        <CommentsForm commentableId={this.props.post.id} commentableType={"Post"} />
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

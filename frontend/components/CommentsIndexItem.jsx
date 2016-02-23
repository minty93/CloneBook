var React = require("react");
var CommentStore = require("../stores/CommentStore");
var PostStore = require("../stores/PostStore");
var CommentsApiUtil = require('../util/comments_api_util');
var PostsApiUtil = require('../util/posts_api_util');
var UserApiUtil = require('../util/users_api_util');
var TimeAgo = require("react-timeago");
var Link = require('react-router').Link;
var CurrentUserStore = require('./../stores/current_user_store');
var UserStore = require('./../stores//UserStore');



var CommentsIndexItem = React.createClass({

  _findCommentById: function (id) {
    var res;
    CommentStore.all().forEach(function (comment) {
      if (id == comment.id) {
        res = comment;
      }
    }.bind(this));
    return res;
  },

  getInitialState: function(){
    var commentId = this.props.comment.id;
    var comment = this._findCommentById(commentId) || {} ;
    return { comment_image: CurrentUserStore.user().profile_pic };
  },
 //
 //
   componentDidMount: function () {
     this.listener = UserStore.addListener(this._onChange);
     UserApiUtil.fetchUser(parseInt(this.props.comment.author_id), function(user){
       if (this.isMounted()) {
         this.setState({comment_image: user.profile_pic})
       }
     }.bind(this));
  },

 //
  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {
   var commentId = this.props.comment.commentId;
   var comment = this._findCommentById(commentId);
   UserApiUtil.fetchUser(parseInt(this.props.comment.author_id), function(user){
     if (this.isMounted()) {
       this.setState({comment_image: user.profile_pic})
     }
   }.bind(this));
 },



  handleDelete: function(e){
    e.preventDefault();
    var that = this;
    UserApiUtil.fetchAllUsers();
    PostsApiUtil.fetchSinglePost(this.props.comment.commentable_id);
    CommentsApiUtil.destroyComment(this.props.comment.id);
  },

  // <h1 className="comment-timeago">Created <TimeAgo date={this.props.comment.created_at} /></h1>


  render: function() {

    var deletebutton = <div></div>;

    if (this.props.comment.author_id == CurrentUserStore.user().id){

      deletebutton = <button className="commentdelete" onClick={this.handleDelete}>Delete</button>
    }

    return (
      <div className="comment-index-items" >
      <img className="small-image1" src={this.state.comment_image} />
        <ul className="comment-index-items-input">
        <Link className="comment-username" to={`users/${this.props.comment.author_id}`}>{this.props.comment.author_name}</Link>
          <li className="actual-comment">{this.props.comment.description}</li>
          <li>{deletebutton}</li>
        </ul>
        <h1 className="timeagosecond"><TimeAgo date={this.props.comment.created_at} /></h1>
      </div>
    );
  },


});

module.exports = CommentsIndexItem;

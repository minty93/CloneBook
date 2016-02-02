var React = require("react");
var CommentsApiUtil = require('../util/comments_api_util');
var PostsApiUtil = require('../util/posts_api_util');
var CommentStore = require("../stores/CommentStore");
var UserApiUtil = require('../util/users_api_util');




var CommentForm = React.createClass({
  getInitialState: function(){
    return {description: ""};
  },

  render: function(){
    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.changeBody} value={this.state.description}/>
          <button>Comment</button>
        </form>
      </div>
    );
  },

  // addUser: function(){
  //   if (this.props.location == ) {
  //
  //   }
  // },

  changeBody: function(e){
    this.setState({description: e.currentTarget.value });
  },

  handleSubmit: function(e){
    e.preventDefault();
    var that = this;
    var comment = {description: that.state.description, commentable_id: this.props.commentableId, commentable_type: this.props.commentableType };
    var callback = function(){
      that.setState({description: "" });};
    PostsApiUtil.fetchAllPosts();
    UserApiUtil.fetchAllUsers();
    CommentsApiUtil.createComment(comment, that.props.commentableId, callback);
  },


});

module.exports = CommentForm;

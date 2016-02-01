var React = require("react");
var CommentStore = require("../stores/CommentStore");
var PostStore = require("../stores/PostStore");
var CommentsApiUtil = require('../util/comments_api_util');

var CommentsIndexItem = React.createClass({



  handleDelete: function(e){
    e.preventDefault();
    var that = this;
    CommentsApiUtil.destroyComment(this.props.comment.id);
  },



  render: function() {
    return (
      <div >
        <ul className="comment-index-items">
          <h1 className="title">{this.props.comment.author_name} commented</h1>
          <li className="actual-comment">{this.props.comment.description}</li>
          <button onClick={this.handleDelete}>Delete</button>
        </ul>
      </div>
    );
  },


});

module.exports = CommentsIndexItem;

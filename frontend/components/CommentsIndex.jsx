var React = require("react");
var CommentStore = require("../stores/CommentStore");
var PostStore = require("../stores/PostStore");
var CommentsIndexItem = require('./CommentsIndexItem');
var CommentsApiUtil = require('../util/comments_api_util');
var CommentsForm = require('./CommentsForm');



var CommentsIndex = React.createClass({
  getInitialState: function(){
    return {comments: CommentStore.all(this.props.commentableId)};
  },

  componentDidMount: function() {
    this.listener = PostStore.addListener(this._onChange);
    this.listener = CommentStore.addListener(this._onChange);
    CommentsApiUtil.fetchAllComments(this.props.commentableId);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },




  render: function() {
    return (
      <div className="commentfeed">
        <ul className="comments-index">
          <li>
            {
              this.state.comments.map(function(comment) {
              return(
              <div>
                <CommentsIndexItem key={comment.id} comment={comment} />
              </div>);
            })
          }</li>
        </ul>
      </div>
    );
  },

  _onChange: function() {
    this.setState({ comments: CommentStore.all(this.props.commentableId) });
  }

});


module.exports = CommentsIndex;

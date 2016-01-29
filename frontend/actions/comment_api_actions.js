var CommentConstants = require('../constants/comment_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var CommentApiActions = {
  receiveComments: function (comments) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_COMMENTS,
      comments: comments
    });
  },

  receiveComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_COMMENT,
      comment: comment
    });
  },

  deleteComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.DELETE_COMMENT,
      comment: comment
    });
  },

  createComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.CREATE_COMMENT,
      comment: comment
    });
  },

};

module.exports = CommentApiActions;

var CommentConstants = require('../constants/comment_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var CommentApiActions = {
  receiveComments: function (comments) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_POSTS,
      comments: comments
    });
  },

  receiveComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_POST,
      comment: comment
    });
  },

  deleteComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.DELETE_POST,
      comment: comment
    });
  },

  createComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.CREATE_POST,
      comment: comment
    });
  },

};

module.exports = CommentApiActions;

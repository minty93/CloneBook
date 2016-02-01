
var _comments = [],
    Store = require ("flux/utils").Store,
    CommentConstants = require("../constants/comment_constants"),
    AppDispatcher = require('../dispatcher/dispatcher'),
    CommentStore = new Store(AppDispatcher);

CommentStore.all = function () {
  return _comments.slice(0);
};

CommentStore.resetComments = function(comments){
  _comments = comments.reverse();
  this.__emitChange();
};

CommentStore._addComment = function (comment) {
  var _commentsIds = [];
  for (var i = 0; i < _comments.length; i++) {
    _commentsIds.push(_comments[i].id);
  }
  var idx = _commentsIds.indexOf(comment.id);
  if (idx == -1) {
    _comments.unshift(comment);
  }
};

CommentStore._removeComment = function (comment) {
  var _commentsIds = [];
  for (var i = 0; i < _comments.length; i++) {
    _commentsIds.push(_comments[i].id);
  }
  var idx = _commentsIds.indexOf(comment.id);
  if (idx != -1) {
    _comments.splice(idx, 1);
    this.__emitChange();
  }
};

CommentStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case CommentConstants.RECEIVE_COMMENTS:
    CommentStore.resetComments(payload.comments);
    break;
  case CommentConstants.DELETE_COMMENT:
    CommentStore._removeComment(payload.comment);
    this.__emitChange();
    break;
  case CommentConstants.CREATE_COMMENT:
    CommentStore._addComment(payload.comment);
    this.__emitChange();
    break;
  }
};


module.exports = CommentStore;

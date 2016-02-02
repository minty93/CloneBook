
var _posts = [],
    Store = require ("flux/utils").Store,
    PostConstants = require("../constants/post_constants"),
    CommentConstants = require("../constants/comment_constants"),
    AppDispatcher = require('../dispatcher/dispatcher'),
    PostStore = new Store(AppDispatcher);

PostStore.all = function () {
  return _posts.slice(0);
};

PostStore.resetPosts = function(posts){
  _posts = posts;
  this.__emitChange();
};

PostStore._addPost = function (post) {
  var _postsIds = [];
  for (var i = 0; i < _posts.length; i++) {
    _postsIds.push(_posts[i].id);
  }
  var idx = _postsIds.indexOf(post.id);
  if (idx == -1) {
    _posts.push(post);
  }
  this.__emitChange();
};

PostStore.getByUserId = function(userId) {
  var userId = parseInt(userId);
  var posts = PostStore.all();
  var relevantPosts = [];
  posts.forEach(function(post){

    if (post.profile_id === userId){
      relevantPosts.push(post);
    }
  });

  return relevantPosts;
};




PostStore._removePost = function (post) {
  var _postsIds = [];
  for (var i = 0; i < _posts.length; i++) {
    _postsIds.push(_posts[i].id);
  }
  var idx = _postsIds.indexOf(post.id);
  if (idx != -1) {
    _posts.splice(idx, 1);
    this.__emitChange();
  }
};

PostStore._findPostById = function(id) {
  id = parseInt(id);
  posts = PostStore.all();
  for (var i = 0; i < posts.length; i++) {
    if (posts[i].id == id) {
      return posts[i];
    }
  }
};

PostStore._addComment = function(comment) {
  var post = this._findPostById(comment.commentable_id);
  post.comments.push(comment);
  this.__emitChange();
};
//
PostStore._removeComment = function (comment) {
  var _commentsIds = [];
  debugger
  var post = this._findPostById(comment.commentable_id);
  for (var i = 0; i < post.comments.length; i++) {
    _commentsIds.push(post.comments[i].id);
  }
  var idx = _commentsIds.indexOf(comment.id);
  if (idx != -1) {
    post.comments.splice(idx, 1);
    this.__emitChange();
  }
};

PostStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case PostConstants.RECEIVE_POSTS:
    PostStore.resetPosts(payload.posts);
    break;
  case PostConstants.DELETE_POST:
    PostStore._removePost(payload.post);
    break;
  case PostConstants.CREATE_POST:
    PostStore._addPost(payload.post);
    break;
  case CommentConstants.DELETE_COMMENT:
    PostStore._removeComment(payload.comment);
    this.__emitChange();
    break;
  case CommentConstants.CREATE_COMMENT:
    PostStore._addComment(payload.comment);
    this.__emitChange();
    break;
  }
};


module.exports = PostStore;

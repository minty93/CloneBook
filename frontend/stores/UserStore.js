
var _users = [],
    Store = require ("flux/utils").Store,
    UserConstants = require("../constants/user_constants"),
    CurrentUserConstants = require("../constants/current_user_constants"),
    PostConstants = require("../constants/post_constants"),
    AppDispatcher = require('../dispatcher/dispatcher'),
    UserStore = new Store(AppDispatcher);

UserStore.all = function () {
  return _users.slice(0);
};

UserStore.resetUsers = function(users){
  _users = users;
  this.__emitChange();
};

UserStore._addUser = function (user) {
  var _usersIds = [];
  for (var i = 0; i < _users.length; i++) {
    _usersIds.push(_users[i].id);
  }
  var idx = _usersIds.indexOf(user.id);
  if (idx == -1) {
    _users.push(user);
  }
  this.__emitChange();
};

UserStore._findUserById = function(id) {
  id = parseInt(id);
  users = UserStore.all();
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      return users[i];
    }
  }
};

UserStore._addPost = function(post) {
  var user = this._findUserById(post.profile_id);
  user.received_posts.push(post);
  this.__emitChange();
};

UserStore._removePost = function (post) {
  var _postsIds = [];
  var user = this._findUserById(post.profile_id);
  for (var i = 0; i < user.received_posts.length; i++) {
    _postsIds.push(user.received_posts[i].id);
  }
  var idx = _postsIds.indexOf(post.id);
  if (idx != -1) {
    user.received_posts.splice(idx, 1);
    this.__emitChange();
  }
};

//
// UserStore._removeUser = function (user) {
//   var idx = _users.indexOf(user);
//   if (idx != -1) {
//     _users.splice(idx, 1);
//     this.__emitChange();
//   }
// };

UserStore._findPostById = function(id) {
  id = parseInt(id);
  posts = PostStore.all();
  for (var i = 0; i < posts.length; i++) {
    if (posts[i].id == id) {
      return posts[i];
    }
  }
};

UserStore._addComment = function(comment) {
  var post = this._findPostById(comment.commentable_id);
  var user = this.__findUserById(post.id);
  post.comments.push(comment);
  this.__emitChange();
};
//
UserStore._removeComment = function (comment) {
  var _commentsIds = [];
  var post = this._findPostById(comment.commentable_id);
  var user = this.__findUserById(post.id);
  debugger
  for (var i = 0; i < user.received_posts.comments.length; i++) {
    _commentsIds.push(post.comments[i].id);
  }
  var idx = _commentsIds.indexOf(comment.id);
  if (idx != -1) {
    post.comments.splice(idx, 1);
    this.__emitChange();
  }
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case UserConstants.RECEIVE_USERS:
    UserStore.resetUsers(payload.users);
    break;
  case UserConstants.RECEIVE_USER:
    UserStore._addUser(payload.user);
    break;
  case PostConstants.CREATE_POST:
    UserStore._addPost(payload.post);
    break;
  case PostConstants.DELETE_POST:
    UserStore._removePost(payload.post);
    break;
  case CurrentUserConstants.RECEIVE_CURRENT_USER:
    UserStore._addUser(payload.currentUser);
    break;
  case CommentConstants.DELETE_COMMENT:
    UserStore._removeComment(payload.comment);
    this.__emitChange();
    break;
  case CommentConstants.CREATE_COMMENT:
    UserStore._addComment(payload.comment);
    this.__emitChange();
    break;
  }
};


module.exports = UserStore;

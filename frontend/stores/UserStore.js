
var _users = [],
    Store = require ("flux/utils").Store,
    UserConstants = require("../constants/user_constants"),
    CommentConstants = require("../constants/comment_constants"),
    CurrentUserConstants = require("../constants/current_user_constants"),
    PostConstants = require("../constants/post_constants"),
    PostStore = require("../stores/PostStore"),
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

UserStore.addNewFriend = function(friend){
  a = UserStore._findUserById(parseInt(friend.requester_id));
  a.requested_friends.push({requestee_id:friend.requestee_id});
  b = UserStore._findUserById(parseInt(friend.requestee_id));
  b.received_friends.push({requester_id:friend.requester_id});
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
  var postInd;
  var post = this._findPostById(comment.commentable_id);
  var user = this._findUserById(post.profile_id);

  for (var i = 0; i < user.received_posts.length; i++) {
    if (user.received_posts[i].id == post.id){
      postInd = i;
    }
  }

  user.received_posts[postInd].comments.push(comment);
  this.__emitChange();
};
//
UserStore._removeComment = function (comment) {
  var _commentsIds = [],
      postind;
  var post = this._findPostById(comment.commentable_id);
  var user = this._findUserById(post.profile_id);

  for (var i = 0; i < user.received_posts.length; i++) {
    if (user.received_posts[i].id == post.id){
      postind = i;
    }
  }

  for (var x = 0; x < user.received_posts[postind].comments.length; x++) {
    _commentsIds.push(user.received_posts[postind].comments[x].id);
  }
  var idx = _commentsIds.indexOf(comment.id);
  if (idx != -1) {
    user.received_posts[postind].comments.splice(idx, 1);
    this.__emitChange();
  }
};


UserStore._addImage = function(photo) {
  var user = this._findUserById(photo.user_id);
  user.photos.push(photo);
  this.__emitChange();
};

UserStore._removeImage = function (image) {
  var _imagesIds = [];
  var user = this._findUserById(image.user_id);
  for (var i = 0; i < user.images.length; i++) {
    _imagesIds.push(user.images[i].id);
  }
  var idx = _imagesIds.indexOf(image.id);
  if (idx != -1) {
    user.images.splice(idx, 1);
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
    break;
  case CommentConstants.CREATE_COMMENT:
    UserStore._addComment(payload.comment);
    break;
  case UserConstants.RECEIVE_PHOTO:
    UserStore._addImage(payload.photo);
    break;
  case UserConstants.FRIEND_RECEIVED:
    UserStore.addNewFriend(payload.friend);
    UserStore.__emitChange();
    break;
  case UserConstants.FRIENDS_RECEIVED:
    // var result = resetFriends(payload.friends);
    // FriendStore.__emitChange();
    break;
  case UserConstants.FRIEND_REMOVED:
    // var result = resetFriends(payload.friends);
    // FriendStore.__emitChange();
}

  // case ImageConstants.DELETE_IMAGE:
  //   UserStore._removeImage(payload.image);
  //   break;

};


module.exports = UserStore;


var _users = [],
    Store = require ("flux/utils").Store,
    UserConstants = require("../constants/user_constants"),
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
  _users.push(user);
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
  }
};


module.exports = UserStore;

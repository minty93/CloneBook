
var _posts = [],
    Store = require ("flux/utils").Store,
    PostConstants = require("../constants/PostConstants"),
    AppDispatcher = require('../dispatcher/dispatcher'),
    PostStore = new Store(AppDispatcher);

PostStore.all = function () {
  return _posts.slice(0);
};

PostStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case PostConstants.:
    PostStore._addPost(payload.post);
    break;
  case PostConstants.:
    PostStore._removePost(payload.post);
    break;
  case PostConstants.:
    PostStore._groupUpdate(payload.posts);
    break;
  }
};

PostStore._addPost = function (post) {
  var idx = _posts.indexOf(post);
  if (idx == -1) {
    _posts.push(post);
    this.__emitChange();
  }
};


PostStore._removePost = function (post) {
  var idx = _posts.indexOf(post);
  if (idx != -1) {
    _posts.splice(idx, 1);
    this.__emitChange();
  }
};

module.exports = PostStore;

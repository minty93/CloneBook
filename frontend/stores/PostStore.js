
var _posts = [],
    Store = require ("flux/utils").Store,
    PostConstants = require("../constants/post_constants"),
    AppDispatcher = require('../dispatcher/dispatcher'),
    PostStore = new Store(AppDispatcher);

PostStore.all = function () {
  return _posts.slice(0);
};

PostStore.resetPosts = function(posts){
  _posts = posts.reverse();
  this.__emitChange();
};

PostStore._addPost = function (post) {
  var _postsIds = [];
  for (var i = 0; i < _posts.length; i++) {
    _postsIds.push(_posts[i].id);
  }
  var idx = _postsIds.indexOf(post.id);
  if (idx == -1) {
    _posts.unshift(post);
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
  }
};


module.exports = PostStore;

var PostConstants = require('../constants/post_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var PostApiActions = {
  receivePosts: function (posts) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_POSTS,
      posts: posts
    });
  },

  receivePost: function (post) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_POST,
      post: post
    });
  },

  deletePost: function (post) {
    AppDispatcher.dispatch({
      actionType: PostConstants.DELETE_POST,
      post: post
    });
  },

  createPost: function (post) {

    AppDispatcher.dispatch({
      actionType: PostConstants.CREATE_POST,
      post: post
    });
  },

  deleteLike: function (like) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.DELETE_LIKE,
      like: like
    });
  },

  createLike: function (like) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.CREATE_LIKE,
      like: like
    });
  },

};

module.exports = PostApiActions;

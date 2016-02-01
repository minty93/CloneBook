var PostApiActions = require("../actions/post_api_actions");

var PostApiUtil = {
  fetchSinglePost: function(id){
    $.ajax({
      url: "api/posts/" + id,
      type: "GET",
      dataType: "json",
      success: function(data){
        PostApiActions.receivePost(data);
      }
    });
  },

  fetchAllPosts: function(){
    $.ajax({
      url: "api/posts",
      type: "GET",
      dataType: "json",
      success: function(data){
        PostApiActions.receivePosts(data);
      }
    });
  },

  destroyPost: function(id){
    $.ajax({
      url: "api/posts/" + id,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        PostApiActions.deletePost(data);
      }
    });
  },

  createPost: function(data, callback){
    $.ajax({
      data: {post: data},
      url: "api/posts",
      type: "POST",
      dataType: "json",
      success: function(data){
        callback && callback();
        PostApiActions.createPost(data);
      }
    });
  },

};

module.exports = PostApiUtil;

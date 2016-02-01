var CommentApiActions = require("../actions/comment_api_actions");

var CommentApiUtil = {
  fetchSingleComment: function(id){
    $.ajax({
      url: "api/posts/" + id,
      type: "GET",
      dataType: "json",
      success: function(data){
        CommentApiActions.receiveComment(data);
      }
    });
  },

  fetchAllComments: function(post_id){
    $.ajax({
      url: "api/posts/" + post_id + "/comments" ,
      type: "GET",
      dataType: "json",
      success: function(data){
        CommentApiActions.receiveComments(data);
      }
    });
  },

  destroyComment: function(id){
    $.ajax({
      url: "api/comments/" + id,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        CommentApiActions.deleteComment(data);
      }
    });
  },

  createComment: function(data, post_id, callback){
    $.ajax({
      data: {comment: data},
      url: "api/posts/" + post_id + "/comments",
      type: "POST",
      dataType: "json",
      success: function(data){
        callback && callback();
        CommentApiActions.createComment(data);
      }
    });
  },

};

module.exports = CommentApiUtil;

var React = require("react");
var PostsApiUtil = require('../util/posts_api_util');


var PostForm = React.createClass({
  getInitialState: function(){
    return {body: ""};
  },

  handleSubmit: function(e){
    e.preventDefault();
    var post = {body: this.state.body};
    PostsApiUtil.createPost(post);
  },

  render: function(){
    debugger
    return (
      <div>
        <h2>Create A Post</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="textarea" value={this.state.body}></input>
          <button>Submit Post</button>
        </form>
      </div>
    );
  }
});

module.exports = PostForm;

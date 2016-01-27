var React = require("react");
var PostsApiUtil = require('../util/posts_api_util');


var PostForm = React.createClass({
  getInitialState: function(){
    return {body: ""};
  },

  render: function(){
    return (
      <div className="post-form">
        <h2>Create A Post</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.changeBody}/>
          <button onClick={this.addUser}>Post</button>
        </form>
      </div>
    );
  },

  changeBody: function(e){
    this.setState({body: e.currentTarget.value });
  },

  handleSubmit: function(e){
    e.preventDefault();
    var post = {body: this.state.body};
    PostsApiUtil.createPost(post);
  },

});

module.exports = PostForm;

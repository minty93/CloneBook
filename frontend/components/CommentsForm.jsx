var React = require("react");
var CommentsApiUtil = require('../util/comments_api_util');
var CommentStore = require("../stores/CommentStore");



var CommentForm = React.createClass({
  getInitialState: function(){
    return {description: "fgfghfghgfhfg"};
  },

  render: function(){
    
    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.changeBody} value={this.state.description}/>
          <button>Comment</button>
        </form>
      </div>
    );
  },

  // addUser: function(){
  //   if (this.props.location == ) {
  //
  //   }
  // },

  changeBody: function(e){
    this.setState({description: e.currentTarget.value });
  },

  handleSubmit: function(e){
    e.preventDefault();
    var that = this;
    var comment = {description: this.state.description};
    var callback = function(){
      that.setState({description: "" });};
    CommentsApiUtil.createComment(comment, callback);
  },


});

module.exports = CommentForm;

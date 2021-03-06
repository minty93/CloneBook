var React = require("react");
var PostsApiUtil = require('../util/posts_api_util');
var UserApiUtil = require('../util/users_api_util');
var PostStore = require("../stores/PostStore");
var UserStore = require("../stores/UserStore");



var PostForm = React.createClass({
  getInitialState: function(){
    return {body: ""};
  },

  render: function(){
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.changeBody} value={this.state.body} placeholder={this.props.placeholder}/>
          <button>Post</button>
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
    this.setState({body: e.currentTarget.value });
  },

  handleSubmit: function(e){
    if(this.props.params.userId){
    var profile_user = UserStore._findUserById(this.props.params.userId)}
    if (profile_user){
      var profile_name = profile_user.fname + " " + profile_user.lname
    }

    e.preventDefault();
    var that = this;
    var post = {body: this.state.body, profile_id: this.props.params.userId, profile_name: profile_name};
    var callback = function(){
      that.setState({body: "" });
    };
    PostsApiUtil.createPost(post, callback);
  },


});

module.exports = PostForm;

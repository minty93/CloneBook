var React = require("react");
var PostStore = require("../stores/PostStore");
var PostsApiUtil = require('../util/posts_api_util');
var CommentsForm = require('./CommentsForm');
var CommentsIndexItem = require('./CommentsIndexItem');
var UserApiUtil = require('../util/users_api_util');
var TimeAgo = require("react-timeago");
var Link = require('react-router').Link;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var CurrentUserStore = require('./../stores/current_user_store');
var UserStore = require('./../stores//UserStore');



var PostsIndexItems = React.createClass({

  _findPostById: function (id) {
    var res;
    PostStore.all().forEach(function (post) {
      if (id == post.id) {
        res = post;
      }
    }.bind(this));
    return res;
  },

  getInitialState: function(){
    var postId = this.props.post.id;
    var post = this._findPostById(postId) || {} ;
    return { post_image: post.profile_pic };
  },
 //
 //
   componentDidMount: function () {
     this.listener = UserStore.addListener(this._onChange);
     UserApiUtil.fetchUser(parseInt(this.props.post.author_id), function(user){
       this.setState({post_image: user.profile_pic})
     }.bind(this));
  },

 //
  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {
   var postId = this.props.post.postId;
   var post = this._findPostById(postId);
   UserApiUtil.fetchUser(parseInt(this.props.post.author_id), function(user){
     this.setState({post_image: user.profile_pic})
   }.bind(this));
 },

 //
 // if(this.props.post.author && this.props.post.author.profile_pic_url){
 //   profile_pic = this.props.post.author.profile_pic_url;
 // }
 // else {
 //   profile_pic = "http://s29.postimg.org/mt68s3j5z/star_wars_profile_pic.jpg";
 // }
 // <img className="small-image" src={this.props.post.author.profile_pic} />

 // if(this.props.user){
 //   to = <Link className="username" to={'users/' + this.props.user.id}></Link>;}
 //     else {
 //       to = <div></div>;
 //       }

 handleDelete: function(e){
   e.preventDefault();
   var that = this;
   PostsApiUtil.destroyPost(this.props.post.id);
 },

  render: function() {

    var comments;
    var profile_pic;
    var to;
    var profile_person;
    var post_image;

    var profile_pic_url;


    var deletebutton;
    if(this.props.post.profile_id !== this.props.post.author_id){
    profile_person = <Link to={'users/' + this.props.post.profile_id}>{this.props.post.profile_name}</Link>
    to = <span> to </span>}


    if (this.props.post.author_id == CurrentUserStore.user().id){
      deletebutton = <button onClick={this.handleDelete}>Delete Post</button>
    }


    if(this.props.post.comments){
      <li >
        {
          comments = this.props.post.comments.map(function(comment, index) {
            return(
              <ReactCSSTransitionGroup key={index} transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              <div>
                <CommentsIndexItem comment={comment}/>
              </div>
            </ReactCSSTransitionGroup>
            );

            })
          }</li>;
        }
    return (
      <div >
        <ul className="post-index-items group">
          <li>{deletebutton}</li>
          <Link className="username" to={'users/' + this.props.post.author_id}>{this.props.post.author_name}</Link> {to}{profile_person}
          <img className="small-image" src={this.state.post_image} />
          <h1 className="timeago">Created<TimeAgo date={this.props.post.created_at} /></h1>
          <li className="actual-post">{this.props.post.body}</li>
        </ul>
        <ul>
        {comments}
        <CommentsForm commentableId={this.props.post.id} commentableType={"Post"} />
        </ul>
      </div>
    );
  },





});

module.exports = PostsIndexItems;

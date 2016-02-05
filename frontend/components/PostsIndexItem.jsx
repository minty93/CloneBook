var React = require("react");
var PostStore = require("../stores/PostStore");
var PostsApiUtil = require('../util/posts_api_util');
var CommentsForm = require('./CommentsForm');
var CommentsIndexItem = require('./CommentsIndexItem');
var UserApiUtil = require('../util/users_api_util');
var TimeAgo = require("react-timeago");
var Link = require('react-router').Link;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var PostsIndexItems = React.createClass({

 //  getInitialState: function(){
 //    var postId = this.props.post.id;
 //    var post = this._findPostById(postId) || {} ;
 //    return { post: post };
 //  },
 //
 //  _findPostById: function (id) {
 //     var res;
 //     PostStore.all().forEach(function (post) {
 //      if (id == post.id) {
 //        res = post;
 //      }
 //    }.bind(this));
 //     return res;
 //  },
 //
  //  componentDidMount: function () {
  //    var elem = this.getDOMNode();
  //    // Set the opacity of the element to 0
  //    elem.style.opacity = 0;
  //    window.requestAnimationFrame(function() {
  //        // Now set a transition on the opacity
  //        elem.style.transition = "opacity 250ms";
  //        // and set the opacity to 1
  //        elem.style.opacity = 1;
  //    });
  // },
 //
 //  componentWillUnmount: function () {
 //    this.listener.remove();
 //  },
 //
 //  _onChange: function () {
 //   var postId = this.props.post.postId;
 //   var post = this._findPostById(this.state.post.id);
 //   this.setState({ post: post });
 // },



  render: function() {


    var comments;
    var profile_pic;
    var to;

    if(this.props.post.comments){
      <li>
        {
          comments = this.props.post.comments.map(function(comment) {
            return(
              <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              <div>
                <CommentsIndexItem key={comment.id} comment={comment}/>
              </div>
            </ReactCSSTransitionGroup>
            );

            })
          }</li>;
        }

      if(this.props.post.author && this.props.post.author.profile_pic_url){
        profile_pic = this.props.post.author.profile_pic_url;
      }
      else {
        profile_pic = "http://s29.postimg.org/mt68s3j5z/star_wars_profile_pic.jpg";
      }

      if(this.props.user){
        to = <Link className="username" to={'users/' + this.props.user.id}></Link>;}
      else {
        to = <div></div>;
      }


    return (
      <div >
        <ul className="post-index-items group">
        <li><button onClick={this.handleDelete}>Delete Post</button></li>
          <img className="small-image" src={profile_pic} />
          <Link className="username" to={'users/' + this.props.post.author_id}>{this.props.post.author_name}{to}</Link>
          <h1 className="timeago">Created <TimeAgo date={this.props.post.created_at} /></h1>
          <li className="actual-post">{this.props.post.body}</li>
        </ul>
        <ul>
        {comments}
        <CommentsForm commentableId={this.props.post.id} commentableType={"Post"} />
        </ul>
      </div>
    );
  },

  handleDelete: function(e){
    e.preventDefault();
    var that = this;
    PostsApiUtil.destroyPost(this.props.post.id);
  },




});

module.exports = PostsIndexItems;

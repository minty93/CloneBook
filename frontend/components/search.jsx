var React = require('react');
var SearchResultsStore = require('../stores/search_results_store');
var SearchApiUtil = require('../util/search_api_util');
var UserProfile = require('./UserProfile');
var PostIndexItem = require('./PostsIndexItem');
var CommentIndexItem = require('./CommentsIndexItem');
var Link = require('react-router').Link;

var Search = React.createClass({

  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },

  getInitialState: function () {
    return {page: 1, query: ""};
  },

  _onChange: function() {
    this.forceUpdate();
  },

  componentWillReceiveProps: function(newProps){

  SearchApiUtil.search("", 1, function(){
    this.setState({page: 1, query: ""});
  }.bind(this));

  },

  reset: function(){
    this.setState({page: 1, query: ""});
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query, 1);

    this.setState({page: 1, query: query});
  },



  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage);

    this.setState({page: nextPage});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {
    var searchResults = SearchResultsStore.all().map(function (searchResult, index) {
      if (searchResult._type === "User") {
        return (<li className="search-result" key={index}><Link to={`users/${searchResult.id}`}><img className="searchimage" src={searchResult.profile_pic_url}/>{searchResult.fname}</Link></li>)

      }
      // else if (searchResult._type === "Post") {
      //   return <li onClick={this.reset}><PostIndexItem post={searchResult} /></li>;
      // }
      // else {
      //   return <li onClick={this.reset}><CommentIndexItem comment={searchResult}/></li>;
      // }
    });


    return (
      <div className="search">
        <h1 className="title"></h1>
        <input className="search-input" type="text" placeholder="Search for a User" onKeyUp={ this.search } />
        <button onClick={this.nextPage}></button>
        <ul className="users-index">{searchResults}</ul>
      </div>
    );
  },


});

module.exports = Search;

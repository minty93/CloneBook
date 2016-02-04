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

    var searchResults = SearchResultsStore.all().map(function (searchResult) {
      if (searchResult._type === "User") {
        return (<li><Link to={`users/${searchResult.id}`}>{searchResult.fname}</Link></li>)

      } else if (searchResult._type === "Post") {
        return <li><PostIndexItem post={searchResult} /></li>;
      }
      else {
        return <li><CommentIndexItem comment={searchResult}/></li>;
      }
    });

    // Displaying {SearchResultsStore.all().length} of
    // {SearchResultsStore.meta().totalCount}
    return (
      <div>
        <h1 className="title"></h1>
        <input type="text" placeholder="Search" onKeyUp={ this.search } />
        <button onClick={this.nextPage}></button>
        <ul className="users-index">{ searchResults }</ul>
      </div>
    );
  },


});

module.exports = Search;

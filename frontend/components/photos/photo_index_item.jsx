var React = require("react");
var ImagesApiUtil = require('../../util/images_api_util');


var PhotoIndexItem = React.createClass({



  render: function () {
    return (
      <li>
        <img className="image-view" src={this.props.photo.photo_url}/>
      </li>
    );
  }

});

module.exports = PhotoIndexItem;

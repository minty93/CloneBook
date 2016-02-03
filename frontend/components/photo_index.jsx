var React = require("react");
var ImagesApiUtil = require('../util/images_api_util');
var PhotoItem = require('./photos/photo_index_item');


var PhotoIndex = React.createClass({

  componentWillReceiveProps: function (newProps) {
    this.forceUpdate();
  },

  render: function () {
    var photoIndex = this.props.user.images.map(function(image) {
      return (
        <PhotoItem key={photo.id} photo={photo}/>
      );
    });


    return (
      <div>
        <ul className="photo-index">
          {photoIndex}
        </ul>
      </div>
    );
  },

});

module.exports = PhotoIndex;

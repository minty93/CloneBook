var React = require('react');
var UsersApiUtil = require('../util/users_api_util.js');
var ImageApiUtil = require('../util/images_api_util');

var UserProfileForm = React.createClass({
  getInitialState: function() {
    return {imageFile: null, imageUrl: "", saving: false};
  },

  render: function() {
    var photo_upload;
    var photo_upload2;
    if(this.state.imageFile) {
    photo_upload = <button className="preview-image-button">Upload Profile </button>;
    photo_upload2 = <img className="preview-image-cover" src={this.state.imageUrl}/>;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="image-form2 group" >
        {photo_upload2}
          <label>
            <i className="fa fa-camera fa-3x">
            {photo_upload}
            </i>
            <input type="file" onChange={this.changeFile} className="image-formhide"/>
          </label>
        </form>

      </div>
    );
  },

  changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (!this.state.saving) {
      var formData = new FormData();
      this.setState({saving: true});
      formData.append("user[profile_pic]", this.state.imageFile);
      var file = this.state.imageFile;
      var formData2 = new FormData();
      formData2.append("photo[photo]", file);
      UsersApiUtil.updateUser(formData, this.props.params.userId, this.resetForm);
      ImageApiUtil.createImage(formData2);
    }
  },

  resetForm: function() {
    this.setState({imageFile: null, imageUrl: "", saving: false});
  }
});

module.exports = UserProfileForm;

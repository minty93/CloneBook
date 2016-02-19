var React = require('react');
var UsersApiUtil = require('../util/users_api_util.js');
var ImageApiUtil = require('../util/images_api_util');

var UserProfileForm = React.createClass({
  getInitialState: function() {
    return {imageFile: null, imageUrl: ""};
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="image-form2">
          <label>
            <input type="file" onChange={this.changeFile} />
          </label>

          <img className="preview-image-cover" src={this.state.imageUrl}/>
          <button>Upload</button>
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
    var formData = new FormData();
    formData.append("user[profile_pic]", this.state.imageFile);
    var file = this.state.imageFile;
    var formData2 = new FormData();
    formData2.append("photo[photo]", file);
    UsersApiUtil.updateUser(formData, this.props.params.userId, this.resetForm);
    ImageApiUtil.createImage(formData2);
  },

  resetForm: function() {
    this.setState({imageFile: null, imageUrl: ""});
  }
});

module.exports = UserProfileForm;

var React = require("react");
var ImageApiUtil = require('../../util/images_api_util');
var UserApiUtil = require('../../util/users_api_util');
var CurrentUserStore = require('../../stores/current_user_store');



var ImageForm = React.createClass({

  getInitialState: function () {
    return {url: "", file: null, description: "", saving: false, upload: "Upload Photo"};
  },

  changeFile: function(e) {
    e.preventDefault();
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function() {
      this.setState({url: reader.result, file: file});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({url: "", file: null});
    }
  },

  clearFields: function() {
    this.setState({url: "", file: null, description: "", saving: false, upload: "Upload Photo"});
  },


  changeDes: function(e){
    this.setState({description: e.currentTarget.value });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    if (!this.state.saving) {
      var file = this.state.file;
      this.setState({saving: true, upload: "Uploading"});
      var formData = new FormData();
      formData.append("photo[photo]", file);
      formData.append("photo[description]", this.state.description);
      ImageApiUtil.createImage(formData, this.clearFields);
      UserApiUtil.fetchAllUsers();
      this.clearFields();
    }


  },


  render: function() {
    return (

      <div className="photo-upload group">
        <form onSubmit={this.handleSubmit}>
          <input className="file-upload" onChange={this.changeFile} type="file"/>
          <input placeholder="Add Description" className="file-des" onChange={this.changeDes} type="text"/>
          <button className="upload-button">{this.state.upload}</button>
        </form>
        <img className="photo-preview-image" src={this.state.url}/>
      </div>
    );
  }

});


module.exports = ImageForm;

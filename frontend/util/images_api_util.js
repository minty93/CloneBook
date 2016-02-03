var ImageApiActions = require("../actions/image_actions");


var ImagesApiUtil = {

createImage: function(formData, callback) {
   $.ajax({
     url: "api/photos/",
     type: 'POST',
     data: formData,
     processData: false,
     contentType: false,
     success: function(photo) {
       callback && callback(photo);
     }
   })
 }
};

module.exports = ImagesApiUtil;

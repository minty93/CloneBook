var PhotoApiActions = require("./../actions/photo_actions");


var ImagesApiUtil = {

createImage: function(formData, callback) {
   $.ajax({
     url: "api/photos/",
     type: 'POST',
     data: formData,
     processData: false,
     contentType: false,
     dataType: 'json',
     success: function(photo) {
      PhotoApiActions.receivePhoto(photo);
       callback && callback();
     }
   });
 }
};

module.exports = ImagesApiUtil;

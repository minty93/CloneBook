var AppDispatcher = require('../dispatcher/dispatcher');



var ImageActions = {

  receiveImage: function (photo) {
    AppDispatcher.dispatch({
        actionType: 'CREATE_IMAGE',
        photo: photo
    });
  },

};

module.exports = ImageActions;

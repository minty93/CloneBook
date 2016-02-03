var AppDispatcher = require('../dispatcher/dispatcher');



var PhotoActions = {

  receivePhoto: function (photo) {
    AppDispatcher.dispatch({
        actionType: 'CREATE_PHOTO',
        photo: photo
    });
  },

};

module.exports = PhotoActions;

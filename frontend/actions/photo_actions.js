var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');



var PhotoActions = {

  receivePhoto: function (photo) {
    AppDispatcher.dispatch({
        actionType: UserConstants.RECEIVE_PHOTO,
        photo: photo
    });
  },

};

module.exports = PhotoActions;

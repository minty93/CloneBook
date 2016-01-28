var UserConstants = require('../constants/user_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var UserApiActions = {
  receiveUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USERS,
      users: users
    });
  },
};

module.exports = UserApiActions;
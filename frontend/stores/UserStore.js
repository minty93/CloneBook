
var _users = [],
    Store = require ("flux/utils").Store,
    UserConstants = require("../constants/user_constants"),
    AppDispatcher = require('../dispatcher/dispatcher'),
    UserStore = new Store(AppDispatcher);

UserStore.all = function () {
  return _users.slice(0);
};

UserStore.resetUsers = function(users){
  _users = users;
  this.__emitChange();
};

UserStore._addUser = function (user) {
  _users.push(user);
  this.__emitChange();
};
//
// UserStore._removeUser = function (user) {
//   var idx = _users.indexOf(user);
//   if (idx != -1) {
//     _users.splice(idx, 1);
//     this.__emitChange();
//   }
// };

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case UserConstants.RECEIVE_USERS:
    UserStore.resetUsers(payload.users);
    break;
  case UserConstants.RECEIVE_USER:
    UserStore._addUser(payload.user);
    break;

  }
};


module.exports = UserStore;

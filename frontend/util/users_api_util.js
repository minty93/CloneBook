var UserApiActions = require("../actions/users_api_actions");
var CurrentUserActions = require("../actions/current_user_actions");
var UserActions = require("../actions/users_api_actions");

var UsersApiUtil = {
fetchAllUsers: function(cb){
  $.ajax({
    url: "api/users",
    type: "GET",
    dataType: "json",
    success: function(data){
      UserApiActions.receiveUsers(data);
      cb && cb()
    },

  });
},

fetchUser: function (id, callback) {
   $.ajax({
     url: '/api/users/' + id,
     type: 'GET',
     dataType: 'json',
     success: function (user) {
       UserApiActions.receiveUser(user);
       callback && callback(user);
     }
   });
 },

 createUser: function (attrs, callback) {
   $.ajax({
     url: 'api/users',
     type: 'POST',
     dataType: 'json',
     data: {user: attrs},
     success: function (user) {
       UserActions.receiveUser(user);
       CurrentUserActions.receiveCurrentUser(user);
       callback && callback();
     }
   });
 },

 updateUser: function (formData, profile_id, callback) {
   $.ajax({
     url: 'api/users/' + profile_id,
     type: 'PATCH',
     processData: false,
     contentType: false,
     dataType: 'json',
     data: formData,
     success: function (user) {
       UserActions.receiveUser(user);
       callback && callback();
     }
   });
  }

};

module.exports = UsersApiUtil;

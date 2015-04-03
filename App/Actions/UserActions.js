var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
var dispatcher = require('../AppDispatcher');
var UserStore = require('../Stores/UserStore');
var FacebookApi = require('../Apis/FacebookApi');
var AlertIOS = require('react-native').AlertIOS;

module.exports = {

  newFacebookSession() {
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        AlertIOS.alert('Unable to sign in');
      } else {
        FacebookApi.getUserInfo(info.userId, info.token);
      }
    });
  },

}

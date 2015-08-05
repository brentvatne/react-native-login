var React = require('react-native');
var {
  AlertIOS,
} = React;

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
var dispatcher = require('../AppDispatcher');
var UserStore = require('../Stores/UserStore');
var UserConstants = require('../Constants/UserConstants');
var FacebookApi = require('../Apis/FacebookApi');

module.exports = {
  newFacebookSession() {
    FacebookLoginManager.newSession((error, info) => {
      alert('test');
      if (error) {
        //AlertIOS.alert('Unable to sign in');
      } else {
        FacebookApi.getUserInfo(info.userId, info.token);
      }
    });
  },

  signOut() {
    dispatcher.handleViewAction({
      actionType: UserConstants.SIGN_OUT,
    });
  },

}

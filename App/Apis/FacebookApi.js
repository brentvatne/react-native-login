var dispatcher = require('../AppDispatcher');
var { dispatch, handleResponse } = require('flux-util').apiHelpersFor(dispatcher);
var ApiConstants = require('../Constants/ApiConstants');
var UserConstants = require('../Constants/UserConstants');

module.exports = {
  getUserInfo(userId, token) {
    var url = `https://graph.facebook.com/v2.3/${userId}?access_token=${token}` +
              '&fields=name,email,picture&format=json';
    var key = UserConstants.FACEBOOK_SIGN_IN;
    var params = {userId: userId, token: token};

    dispatch(key, ApiConstants.PENDING, params)
    fetch(url).then(handleResponse(key, params))
  }
}

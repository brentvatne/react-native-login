var NativeModules = require('NativeModules');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');
var createReactIOSNativeComponentClass = require('createReactIOSNativeComponentClass');

var Video = createReactIOSNativeComponentClass({
  validAttributes: ReactIOSViewAttributes.UIView,
  uiViewClassName: 'BVideoPlayer',
});

module.exports = Video;

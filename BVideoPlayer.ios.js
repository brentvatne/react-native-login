var React = require('React');
var NativeModules = require('NativeModules');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');
var StyleSheet = require('StyleSheet');
var createReactIOSNativeComponentClass = require('createReactIOSNativeComponentClass');
var PropTypes = require('ReactPropTypes');
var StyleSheetPropType = require('StyleSheetPropType');
var VideoStylePropTypes = require('./VideoStylePropTypes');
var NativeMethodsMixin = require('NativeMethodsMixin');
var flattenStyle = require('flattenStyle');
var merge = require('merge');

var Video = React.createClass({
  propTypes: {
    source: PropTypes.string,
    style: StyleSheetPropType(VideoStylePropTypes),
  },

  mixins: [NativeMethodsMixin],

  viewConfig: {
    uiViewClassName: 'UIView',
    validAttributes: ReactIOSViewAttributes.UIView
  },

  render: function() {
    var style = flattenStyle([styles.base, this.props.style]);
    var source = this.props.source;

    var nativeProps = merge(this.props, {
      style,
    });

    nativeProps.src = source;
    return <BVideoPlayer {... nativeProps} />
  },
});

var BVideoPlayer = createReactIOSNativeComponentClass({
  validAttributes: merge(ReactIOSViewAttributes.UIView, {src: true}),
  uiViewClassName: 'BVideoPlayer',
});

var styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});

module.exports = Video;

'use strict';

var VideoResizeMode = require('./VideoResizeMode');
var LayoutPropTypes = require('LayoutPropTypes');
var ReactPropTypes = require('ReactPropTypes');

var VideoStylePropTypes = {
  ...LayoutPropTypes,
  resizeMode: ReactPropTypes.oneOf(Object.keys(VideoResizeMode)),
};

var unsupportedProps = Object.keys({
  padding: null,
  paddingTop: null,
  paddingLeft: null,
  paddingRight: null,
  paddingBottom: null,
  paddingVertical: null,
  paddingHorizontal: null,
});

for (var key in unsupportedProps) {
  delete VideoStylePropTypes[key];
}

module.exports = VideoStylePropTypes;

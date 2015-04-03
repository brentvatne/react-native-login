var deviceWidth = require('./device').width;

module.exports = function(image) {
  return (image.get('height') / image.get('width')) * deviceWidth;
}

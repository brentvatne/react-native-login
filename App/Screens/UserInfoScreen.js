'use strict';

var React = require('react-native');
var {
  Text,
  View,
  Image,
  Navigator,
} = React;

var Video = require('react-native-video');
var UserStoreSync = require('../Mixins/UserStoreSync');
var styles = require('./Styles');

var UserInfoScreen = React.createClass({
  mixins: [UserStoreSync],

  render() {
    return (
      <View style={styles.background}>
        <Video source={"background"} style={styles.backgroundVideo}
          resizeMode="cover" repeat={true} />
        <View style={styles.backgroundOverlay} />

        <View style={styles.contentContainer}>
          <Image source={{uri: this.state.user.getIn(['picture', 'data', 'url'])}}
                 style={styles.profilePicture} />
          <Text style={styles.name}>
            {this.state.user.get('name')}
          </Text>
        </View>
      </View>
    )
  }
});

module.exports = UserInfoScreen;

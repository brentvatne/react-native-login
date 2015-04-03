'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Navigator,
  AlertIOS,
} = React;

var UserActions = require('../Actions/UserActions');
var UserStore = require('../Stores/UserStore');
var Video = require('react-native-video');
var Modal = require('react-native-modal');
var LinearGradient = require('react-native-linear-gradient');
var UserActions = require('../Actions/UserActions');
var styles = require('./Styles');
var UserStoreSync = require('../Mixins/UserStoreSync');

var LoginScreen = React.createClass({
  mixins: [UserStoreSync],

  getInitialState() {
    return { modalIsOpen: false }
  },

  openModal() {
    this.setState({modalIsOpen: true});
  },

  closeModal() {
    this.setState({modalIsOpen: false});
  },


  login() {
    UserActions.newFacebookSession();
  },

  afterUpdateUserFromStore() {
    var user = UserStore.getState();

    if (user.get('email')) {
      this.props.navigator.replace({id: 'user-info'});
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Video source={"background"} style={styles.backgroundVideo} repeat={true} key="video" />

        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={this.login}>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                Sign in with Facebook
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.openModal} style={styles.aboutButton}>
            <Text style={styles.aboutButtonText}>
              About this project
            </Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={this.state.modalIsOpen} onClose={this.closeModal}>
          <Text style={styles.aboutTitle}>
            Welcome to the about section!
          </Text>

          <Text style={styles.aboutBody}>
            This is just for fun to use a modal, nothing fancy to see here. A big thanks
            the react-native team for this wonderful tool!
          </Text>
        </Modal>
      </View>
    );
  },
});

module.exports = LoginScreen;

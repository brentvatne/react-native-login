'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} = React;

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
var Video = require('react-native-video');
var LinearGradient = require('react-native-linear-gradient');

var Modal = React.createClass({
  render() {
    if (this.props.isVisible) {
      return (
        <View style={modalStyles.container}>
          <View style={modalStyles.backdrop} />
          <View style={modalStyles.closeButton}>
            <TouchableOpacity onPress={this.props.onClose}>
              <Text style={modalStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={modalStyles.modal}>
            {this.props.children}
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  },
});

var modalStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  closeButton: {
    position: 'absolute',
    borderColor: '#ffffff',
    borderRadius: 2,
    borderWidth: 1,
    right: 20,
    top: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  closeButtonText: {
    color: '#ffffff',
  },
  modal: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: 20,
    alignSelf: 'stretch',
  }
});

var FacebookLogin = React.createClass({
  getInitialState() {
    return {
      result: ''
    }
  },

  componentDidMount() {
    var self = this;
  },

  login() {
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        this.setState({result: error});
      } else {
        this.setState({token: info.token, userId: info.userId});
        this.getUser();
      }
    });
  },

  getUser() {
    var url = `https://graph.facebook.com/v2.3/${this.state.userId}?access_token=${this.state.token}` +
              '&fields=name,email,picture&format=json'
    if (this.state.token) {
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({user: responseData});
        })
    }
  },

  openModal() {
    this.setState({modalIsOpen: true});
  },

  closeModal() {
    this.setState({modalIsOpen: false});
  },

  renderLogInView() {
    return (
      <View style={styles.container}>
        <Video source={"background"} style={styles.backgroundVideo} repeat={true} />

        <TouchableHighlight onPress={this.login}>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
              Sign in with Facebook
            </Text>
          </LinearGradient>
        </TouchableHighlight>

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

  renderLoggedInView() {
    return (
      <View style={styles.background}>
        <Video source={"background"} style={styles.backgroundVideo} repeat={true} />
        <View style={styles.backgroundOverlay} />

        <View style={styles.contentContainer}>
          <View>
            <Image source={{uri: this.state.user.picture.data.url}}
                   style={styles.profilePicture} />
            <Text style={styles.name}>
              {this.state.user.name}
            </Text>
          </View>
        </View>
      </View>
    )
  },

  render() {
    if (!this.state.user) {
      return this.renderLogInView();
    } else {
      return this.renderLoggedInView();
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  backgroundOverlay: {
    opacity: 0.85,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundVideo: {
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  aboutButtonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#efefef',
    opacity: 0.8,
  },
  contentContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 15,
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
  },
  aboutButton: {
  },
  aboutTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  aboutBody: {

  }
});

AppRegistry.registerComponent('FacebookLogin', () => FacebookLogin);

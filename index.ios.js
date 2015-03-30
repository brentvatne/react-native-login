'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} = React;

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
var Video = require('./Video.ios');

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

  renderLogInView() {
    return (
      <View style={styles.container}>
        <Video source={"background"} style={styles.backgroundVideo} />

        <TouchableHighlight onPress={this.login} style={styles.button}>
          <Text style={styles.buttonText}>
            Sign in with Facebook
          </Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={styles.result}>
            {this.state.result}
          </Text>
        </TouchableHighlight>
      </View>
    );
  },

  renderLoggedInView() {
    return (
      <View style={styles.background}>
        <Video source={"background"}
               style={styles.backgroundVideo} />
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
  button: {
    backgroundColor: "#3a5896",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
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
});

AppRegistry.registerComponent('FacebookLogin', () => FacebookLogin);

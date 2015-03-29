'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
var Video = require('./BVideoPlayer.ios');

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
        this.setState({result: info});
      }
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <Video source={"background"}
               style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
        </Video>

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
  }
});


      // <View style={styles.container}>
      // </View>

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  result: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

AppRegistry.registerComponent('FacebookLogin', () => FacebookLogin);

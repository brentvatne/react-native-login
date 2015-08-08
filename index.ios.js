'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Navigator,
  View,
  Stylesheet,
} = React;

var LocalStorage = require('./App/Stores/LocalStorage');
var UserStore = require('./App/Stores/UserStore');
var UserInfoScreen = require('./App/Screens/UserInfoScreen');
var LoginScreen = require('./App/Screens/LoginScreen');

var FacebookLogin = React.createClass({
  getInitialState() {
    return {bootstrapped: false}
  },

  componentWillMount() {
    LocalStorage.bootstrap(() => this.setState({bootstrapped: true}));
  },

  renderScene(route, nav) {
    switch (route.id) {
      case 'authenticate':
        return <LoginScreen navigator={nav} />;
      case 'user-info':
        return <UserInfoScreen navigator={nav} />;
      default:
        return <View />;
    }
  },

  render() {
    if (this.state.bootstrapped === false) {
      return <View />
    }

    return (
      <Navigator
        initialRoute={{ id: 'authenticate', }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }

          return Navigator.SceneConfigs.FloatFromRight;
        }} />
    );
  }
})

AppRegistry.registerComponent('FacebookLogin', () => FacebookLogin);

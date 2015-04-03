var UserStore = require('../Stores/UserStore');

module.exports = {
  getInitialState() {
    return {user: UserStore.getState()}
  },

  updateUserFromStore() {
    this.setState({user: UserStore.getState()});
    if (this.afterUpdateUserFromStore) {
      this.afterUpdateUserFromStore();
    }
  },

  componentDidMount() {
    this.updateUserFromStore();
    UserStore.addChangeListener(this.updateUserFromStore);
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this.updateUserFromStore);
  },
};

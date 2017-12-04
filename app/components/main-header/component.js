import Ember from 'ember';

const { service } = Ember.inject;
const { get, set } = Ember;

export default Ember.Component.extend({
  session: service('session'),
  currentUser: service('current-user'),
  sideMenu: service(),

  actions: {
    setPicture(image) {
      set(this, 'currentUser.tmpPicture', image)

      this.get('goToCropper')();
    },

    browse() {
      let fileInput = this.$("input");
      fileInput.click();
      get(this, 'sideMenu').close();
    },

    logout(){
      get(this, 'session').invalidate();
    },

    toggleSchedule() {
      this.toggleProperty('showSchedule');
    }
  }
});

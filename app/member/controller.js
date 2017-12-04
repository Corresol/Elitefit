import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToCropper() {
      this.transitionToRoute('member.upload-picture');
    }
  }
});

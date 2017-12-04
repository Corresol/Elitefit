import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["app-header"],
  showMenuToggle: true,
  actions: {
    goToCropper() {
      this.transitionToRoute('member.upload-picture');
    }
  }
});

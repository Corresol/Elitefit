import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    Ember.$('body').addClass(this.routeName.replace('\.', '-'));
  },
  deactivate() {
    Ember.$('body').removeClass(this.routeName.replace('\.', '-'));
  }
});

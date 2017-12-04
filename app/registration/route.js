import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('activity');
  },

  beforeModel() {
    this.store.findAll('user');
  }

});

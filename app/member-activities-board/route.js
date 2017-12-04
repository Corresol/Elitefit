import Ember from 'ember';
const { RSVP } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.findAll('activity-type');
  },

  setupController(controller, model) {
    this.store.findAll('user').then((users) => {
      controller.set('model', model);
      controller.set('members', users);
    });
  }
});

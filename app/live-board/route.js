import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
        activities: this.get('store').findAll('activity', { reload: true }),
        users: this.get('store').findAll('user')
       });
  },
  setupController: function(controller, model) {
    controller.set('activities', model.activities);
    controller.set('users', model.users);
  }
});

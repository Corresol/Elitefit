import Ember from 'ember';

const { inject } = Ember;
const { service } = inject;

export default Ember.Route.extend({
  session: service(),
  model() {
    return this.store.findRecord('user', this.get('session.data.authenticated.user.id') );
  }
});

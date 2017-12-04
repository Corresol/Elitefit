import Ember from 'ember';

const { inject, computed, get } = Ember;

export default Ember.Route.extend({
  session: inject.service(),
  currentUserId: computed.alias('session.session.content.authenticated.user.ext_id'),
  currentUserDbId: computed.alias('session.session.content.authenticated.user.id'),

  model(params) {
    const userId = get(this, 'session.session.content.authenticated.user.id');
    return this.store.findRecord('user', userId);
  },

  beforeModel() {
    this.store.findAll('activity-type');
    this.store.findAll('activity');
  }
});

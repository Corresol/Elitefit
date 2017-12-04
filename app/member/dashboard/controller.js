import Ember from 'ember';
const { get, computed, alias, set, inject, isPresent } = Ember;

export default Ember.Controller.extend({
  session: inject.service(),

  currentUser: computed.alias('session.session.content.authenticated.user')
});

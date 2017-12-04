import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Configuration from 'ember-simple-auth/configuration';
import moment from 'moment';

const { service } = Ember.inject;
const { get, set } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  moment: service(),
  currentUser: service(),
  session: service(),

  beforeModel() {
    this.store.findAll('activity-type');
  },

  afterModel() {
    this.get('moment').changeLocale('nl');

    if ( get(this, 'session.isAuthenticated') ) {
      this._loadCurrentUser();
    }
  },

  sessionAuthenticated() {
    this._loadCurrentUser().then().catch(() => get(this, 'session').invalidate());
    this._super(...arguments);
  },

  _loadCurrentUser() {
    return get(this, 'currentUser').load();
  },

});

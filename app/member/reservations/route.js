import Ember from 'ember';
import ENV from 'elitefit-member/config/environment';
import Phoenix from 'ember-phoenix-chan';

const { get, set, inject, computed } = Ember;
const { Socket, Channel } = Phoenix;
const { host } = ENV;

export default Ember.Route.extend({
  isFinished: true,
  session: inject.service(),
  reservationChannel: inject.service(),
  currentUserId: computed.alias('session.session.content.authenticated.user.ext_id'),
  aajax: inject.service('authorized-ajax'),
  setupController(controller, model){
    this._super(...arguments);

    get(this, 'reservationChannel').init();
  },

  model() {
    return this.store.findAll('activity');
  },

  beforeModel() {
    let isNewUser = this.get('session.session.authenticated.user.username') === this.get('session.session.authenticated.user.ext_id')

    this.store.findAll('activity-type');

    if(isNewUser) {
      this.transitionTo('member.account');
    }
  },
  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('member.reservations');
      controller.set('isFinished', false);
      controller.transitionToRoute('member.loading');
      transition.promise.finally(function() {
        controller.transitionToRoute('member.reservations');
        setTimeout(() => {
          controller.set('isFinished', true);
        }, 2000);
      });
    }
  }
});

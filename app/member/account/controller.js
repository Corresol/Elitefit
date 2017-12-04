import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToReservations() {
      this.transitionToRoute('member.reservations');
    }
  }
});

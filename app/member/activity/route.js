import Ember from 'ember';

export default Ember.Route.extend({
  model({ activity_id }) {
    return Ember.RSVP.hash({
      activity: this.store.findRecord('activity', activity_id),
      activityTypes: this.store.peekAll('activity-type')
    });
  }
});

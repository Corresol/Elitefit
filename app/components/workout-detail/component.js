import Ember from 'ember';

const { computed, set, get } = Ember;

export default Ember.Component.extend({
  backgroundImage: Ember.computed('activity.image_url', function() {
    let background = this.get('activity.image_url');
    return Ember.String.htmlSafe("background: url(https://elitefit.opencontrolplus.com/" + background + ") no-repeat bottom center");
  }),

  reservations: computed('activity.reservations.@each', function() {
    let count = get(this, 'activity.reservations.length') + 100 + '';
    return count.slice(1);
  }),
  maxCapacity: computed('activity.max_capacity', 'activity.reservations.@each', function() {
    let count = (get(this, 'activity.max_capacity') - get(this, 'activity.reservations.length')) + 100 + '';
    return count.slice(1);
  })

});

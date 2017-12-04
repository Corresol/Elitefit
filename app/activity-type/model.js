import DS from 'ember-data';
import Ember from 'ember';

const { isPresent, get, computed, isEmpty } = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),
  activityIds: DS.attr('integer-array', { defaultValue: [] }),

  activities: computed('activityIds', function() {
    return get(this, 'activityIds').map((itemId) => {
      return this.store.peekRecord('activity', itemId);
    }).filter((item) => { return isPresent(item); });
  })
});

import Ember from 'ember';

const { isPresent, isBlank, get, set, inject, computed } = Ember;

export default Ember.Component.extend({
  store: inject.service(),
  newActivityType: null,
  currentActivityType: null,
  hasNewActivityType: computed('newActivityType', function() {
    return isPresent(get(this, 'newActivityType'));
  }),

  hasCurrentActivityType: computed('currentActivityType', function() {
    return isPresent(get(this, 'currentActivityType'));
  }),
  actions: {
    addNew() {
      if(!get(this, 'hasNewActivityType')) {
        this.set('newActivityType', this.get('store').createRecord('activityType'));
      }
    },

    save() {
      this.get('currentActivityType').save();
    },

    edit(type) {
      this.set('currentActivityType', type);
    },

    cancel() {
      set(this, 'currentActivityType', null)
      if(!get(this, 'hasNewActivityType')) {
        set(this, 'newActivityType', null)
      }
    }
  }
});

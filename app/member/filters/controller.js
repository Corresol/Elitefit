import Ember from 'ember';
import _ from 'lodash/lodash';
const { get, computed, alias, set, inject, isPresent } = Ember;

export default Ember.Controller.extend({
  filters: [],

  actions: {
    schedule() {
      set(this, 'showSchedule', true);
      set(this, 'showFiltered', false);
    },

    setFilter(filters) {
      set(this, 'showFiltered', true);
      set(this, 'showSchedule', false);
      set(this, 'filters', filters)
    },

    setShowFilter(value) {
      set(this, 'showFilter', value);
    }
  }
});

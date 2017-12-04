import Ember from 'ember';

const { isPresent, set, get, computed, inject } = Ember;

export default Ember.Component.extend({
  showFilterValue: false,
  filtersService: inject.service('filters'),

  filters: computed.alias('filtersService.filters'),
  didInsertElement() {
    set(this, 'filtersService.enabled', true);
    set(this, 'filtersService.currentUser', get(this, 'currentUser'));
  },

  selectedFilters: computed('filters', function() {
    return get(this, 'filters').options.filterBy('selected', true);
  }),

  showFilter: computed('showFilterValue', {
    get() {
      return get(this, 'showFilterValue');
    },
    set(attr, value) {
      set(this, 'showFilterValue', value);
      get(this, 'setShowFilter')(value);
    }

  }),
  filtersCount: computed('filters.@each.selected', function() {
    return get(this, 'filters').filter(filter => filter.get('selected.length') > 0).length;
  }),

  actions: {
    toggleFilterItem(key) {
      get(this, 'filters').rejectBy('key', key).setEach('visible', false);
      let item = get(this, 'filters').findBy('key', key);

      item.toggleProperty('visible');
    },

    toggleFilterOption(filter, option) {
      option.toggleProperty('selected');
      filter.set('selected', filter.get('options').filterBy('selected', true));
    },

    setFilter() {
      this.get('setFilter')(get(this, 'filters'));
      this.set('filtersService.enabled', true);
    },

    unsetFilter() {
      get(this, 'filters').forEach((filter) => {
        filter.get('options').filterBy('selected', true).setEach('selected', false);
        filter.set('selected', []);
      });
      this.get('setFilter')(get(this, 'filters'));
      this.set('filtersService.enabled', false);
    }
  }
});

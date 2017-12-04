import Ember from 'ember';

const { isPresent, set, get, computed, inject } = Ember;
export default Ember.Service.extend({
  currentUser: null,
  enabled: false,

  filtersCount: computed('filters.@each.selected', function() {
    return get(this, 'filters').filter(filter => filter.get('selected.length') > 0).length;
  }),

  filters: computed('currentUser.@each.allowedActivityNames', function() {
    if(isPresent(get(this, 'currentUser'))) {
    return Ember.A([
      Ember.Object.create({
        name: 'Type',
        key: 'type',

        visible: false,
        selected: [],
        options: get(this, 'currentUser.allowedActivityNames').map((item) => {
          return Ember.Object.create({ selected: false, key: item, target: 'name', name: item });
        })
      }),
      Ember.Object.create({
        name: 'Dag',
        key: 'day',

        visible: false,
        selected: [],
        options: [
          Ember.Object.create({ selected: false, key: "1", target: 'week_day', name: 'maandag' }),
          Ember.Object.create({ selected: false, key: "2", target: 'week_day', name: 'dinsdag' }),
          Ember.Object.create({ selected: false, key: "3", target: 'week_day', name: 'woensdag' }),
          Ember.Object.create({ selected: false, key: "4", target: 'week_day', name: 'donderdag' }),
          Ember.Object.create({ selected: false, key: "5", target: 'week_day', name: 'vrijdag' }),
          Ember.Object.create({ selected: false, key: "6", target: 'week_day', name: 'zaterdag' })
        ]
      }),
      Ember.Object.create({
        name: 'Reservering',
        key: 'reservation',

        visible: false,
        selected: [],
        options: [
          Ember.Object.create({ selected: false, key: "true", target: 'isReserved', name: 'Mijn reserveringen' }),
          Ember.Object.create({ selected: false, key: "true", target: 'hasAvailable', name: 'Beschikbaar' }),
        ]
      })
    ])
    } else {
      return Ember.A([]);
    }
  }),

});

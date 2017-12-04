import Ember from 'ember';
import _ from 'lodash/lodash';
const { get, computed, alias, set, inject, isPresent } = Ember;

export default Ember.Controller.extend({
  showFilter: false,
  showReservations: false,
  session: inject.service(),
  currentDay: '',
  filtersService: inject.service('filters'),
  cdv: inject.service("ember-cordova/platform"),

  filters: computed.alias('filtersService.filters'),

  init() {
    this.set('showFilter', false);
    this.set('showReservations', false);
  },

  currentUserId: computed.alias('session.session.content.authenticated.user.ext_id'),
  currentUserDbId: computed.alias('session.session.content.authenticated.user.id'),
  currentUser: computed('currentUserDbId', function() {
    return this.store.peekRecord('user', Number(get(this, 'currentUserDbId')));
  }),

  reservations: computed('model.@each.reservations', function() {
    return get(this, 'model').filter(activity => activity.get('reservations').any(reservation => reservation.get('reserved')));
  }),

  activitiesByWeekdays: computed("model","showReservations", "filtersService.enabled", "reservations", "filters.@each.selected", function() {
    let activities = get(this, "model");
    let facets = get(this, 'filters').getEach('selected');
    let filteredActivities = activities.toArray();

    if(get(this, 'showReservations')) {
      get(this, 'reservations')
      return _.groupBy(get(this, 'reservations'), model => get(model, 'date'));
    } else {
      if(get(this, 'filtersService.enabled') && _.flatten(facets).length > 0) {
        filteredActivities = activities.filter((item) => {
          return facets.map((filters) => {
            if(filters.length > 0) {
              let matchesAllFacets = filters.map((filter) => {
                return item.get(filter.get('target')).toString().underscore().indexOf(filter.get('key').underscore()) > -1;
              }).any(item => item === true);
              return matchesAllFacets;
            } else {
              return true;
            }
          }).every(item => item === true);
        }).toArray();
      }
      return _.groupBy(filteredActivities, model => get(model, 'date'));
    }
  }),

  actions: {
    setCurrentDay(day) {
      set(this, 'previousDay', get(this, 'currentDay'));

      if(day !== get(this, 'previousDay')) {
        set(this, 'currentDay', day)

        if(isPresent(get(this, 'previousDay'))) {
          $(`#${get(this, 'previousDay')}`).removeClass('detached');
        }
        $(`#${day}`).addClass('detached');
      } else {
        if( get(this, 'currentDay') === moment().locale('nl').format('dddd') ) {
          $(`#${day}`).addClass('detached');
        }
      }
    },

    reservations() {
      set(this, 'filtersService.enabled', false);
      set(this, 'showReservations', true);
    },

    enableFilter(value) {
      set(this, 'showReservations', false);
      set(this, 'filtersService.enabled', true);
      this.transitionToRoute('member.filters');
    }
  }
});

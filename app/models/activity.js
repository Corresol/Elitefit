const { inject, set, get, computed } = Ember;
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  starts_at: attr('string'),
  ends_at: attr('string'),
  date: attr(),
  week_day: attr('number'),
  description: attr('string'),
  ext_description: attr('string'),
  staff_id: attr('number'),
  staff_name: attr('string'),
  image_url: attr('string'),
  current_user_id: attr('number'),
  max_capacity: attr('number'),
  add_reservation_pay_load: attr(),
  remove_reservation_pay_load: attr(),
  moment: inject.service(),
  reservations: hasMany('reservation', { async: true }),
  waitings: hasMany('waiting', { async: true }),
  definition: attr(),

  activityType: computed('id', function() {
    return this.store.peekAll('activity-type').find(item => item.get('activityIds').includes(Number(get(this, 'id'))));
  }),
  time: computed('starts_at', function() {
    return [get(this, 'starts_at').slice(0,5), get(this, 'ends_at').slice(0,5)].join(' - ');
  }),

  longName: computed('name', function() {
    return [moment(get(this, 'date')).format('ddd'), get(this, 'starts_at').slice(0,5), get(this, 'name')]
  }),

  available: computed('max_capacity', 'reservations', function() {
    return get(this, 'max_capacity') - get(this, 'reservations').toArray().length;
  }),

  hasAvailable: computed('available', function() {
    return get(this, 'available') > 0;
  }),

  isReserved: computed('reservations', 'reserved', function() {
    return get(this, 'reservations').any(reservation => get(reservation, 'reserved'));
  }),

  full: computed('max_capacity', 'reservations', function() {
    return get(this, 'reservations.length') === get(this, 'max_capacity');
  }),

  availability: computed('max_capacity', 'reservations', function() {
    let result = get(this, 'reservations.length')/get(this, 'max_capacity');
    if ( result === 1) {
      return "VOL";
    }
    return `${get(this, 'reservations.length')}/${get(this, 'max_capacity')}`;
  }),

  reservedUsers: computed('reservations', function() {
    return get(this, 'reservations');
  }),

  weekDay: computed('week_day', function() {
    moment.locale('nl')
    return moment().isoWeekday(get(this, 'week_day')).format('dddd');
  }),

  addReservation() {
    const available = Number(get(this, 'available'));
    const reservations = get(this, 'reservations');

    //this.get('reservations').createRecord({ user_id: get(this, 'current_user_id') })

    //set(this, 'available', available - 1);
  },

  removeReservation() {
    const available = Number(get(this, 'available'));
    const reservations = get(this, 'reservations');

    // let newReservations = reservations.filter((item) => {
    //   return item.get('user_id').toString() !== get(this, 'current_user_id').toString();
    // });

    // set(this, 'available', available + 1);
    // set(this, 'reservations', newReservations);
  }
});

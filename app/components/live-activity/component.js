import Ember from 'ember';

const { get, set, Component, A, computed} = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['item'],

  reserved: computed('activity.reservations', function() {
    return get(this, 'activity.reservations').length;
  }),

  spots: computed('activity.reservations', 'activity.max_capacity', function() {
    let spots = (Number(get(this,'activity.max_capacity')) - Number(get(this, 'activity.reservations.length')));
    let freeSpots = Array.from(new Array(spots));

    return freeSpots.map((spot) => {
      return Ember.Object.create({
        name: '...',
        picture: 'available.jpg'
      });
    });
  })
});

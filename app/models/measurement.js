import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { computed } = Ember;
const { get, set } = Ember;

export default Model.extend({
  measuredAt: attr('date', { defaultValue: new Date() }),
  weightKg: attr('number', { defaultValue: 0 }),
  chest: attr('number', { defaultValue: 0 }),
  triceps: attr('number', { defaultValue: 0 }),
  subscapular: attr('number', { defaultValue: 0 }),
  midAx: attr('number', { defaultValue: 0 }),
  supralliac: attr('number', { defaultValue: 0 }),
  umbilical: attr('number', { defaultValue: 0 }),
  quadriceps: attr('number', { defaultValue: 0 }),
  hamstring: attr('number', { defaultValue: 0 }),

  isFemale() {
    return this.get('user.gender') === 'F';
  },

  user: belongsTo('user', { async: false }),

  age: computed('user.birthdate', function() {
    return moment().diff(moment(get(this, 'user.birthdate')), 'years');
  }),

  fatPercentage: computed('boneDensity2', function() {
    return (get(this, 'boneDensity2') * 100).toFixed(2);
  }),

  fatMass: computed('weightKg', 'fatPercentage', function() {
    return (get(this, 'fatPercentage') * get(this, 'weightKg') / 100).toFixed(2);
  }),

  leanMass: computed('fatMass', function() {
    return (get(this, 'weightKg') - get(this, 'fatMass')).toFixed(2);
  }),

  gender: computed('user.gender', function() {
    return get(this, 'user.gender');
  }),

  boneDensity2: computed('boneDensity', 'user.gender', function() {
    if(get(this, 'user.gender') === 'F') {
      return (5.01 / get(this, 'boneDensity')) - 4.57;
    } else {
      return (4.95 / get(this, 'boneDensity')) - 4.5;
    }
  }),

  total: computed('triceps','chest','subscapular','midAx','supralliac','umbilical','quadriceps','age','user.gender', function() {
    return  Number(get(this, 'chest')) +
    Number(get(this, 'triceps')) +
    Number(get(this, 'subscapular')) +
    Number(get(this, 'midAx')) +
    Number(get(this, 'supralliac')) +
    Number(get(this, 'umbilical')) +
    Number(get(this, 'quadriceps')) +
    Number(this.isFemale() ? this.get('hamstring') : 0)
  }),

  boneDensity: computed('total', 'age', 'user.gender', function() {
    if(get(this, 'user.gender') === 'F') {
      return  (1.097 -
        (0.00046971 * get(this, 'total')) +
        (0.00000056 * (get(this, 'total') * this.get('total'))) -
        (0.00012828 * get(this, 'age')));
      } else {
        return (1.112 -
          (0.00043499 * get(this, 'total')) +
          (0.00000055 * (get(this, 'total') * get(this, 'total'))) -
          (0.00028826 * get(this, 'age')));
      }
  })
});

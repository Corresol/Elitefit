import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { computed } = Ember;
const { get, set } = Ember;

export default Model.extend({
  measuredAt: attr('date', { defaultValue: new Date() }),
  belly: attr('number', { defaultValue: 0 }),
  waist: attr('number', { defaultValue: 0 }),
  neck: attr('number', { defaultValue: 0 }),
  upperLeg: attr('number', { defaultValue: 0 }),

  user: belongsTo('user', { async: false }),

  total: computed('belly','waist','neck','upperLeg', function() {
    return Number(get(this, 'belly')) +
    Number(get(this, 'waist')) +
    Number(get(this, 'neck')) +
    Number(get(this, 'upperLeg'))
  })
});

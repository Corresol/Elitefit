import DS from 'ember-data';
import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { computed } = Ember;

export default DS.Model.extend({
  username: attr('string'),
  user_tagline: attr('string'),
  profile_picture: attr('string'),
  activity: belongsTo('activity', {  inverse: null }),
  reserved: attr('boolean')
});

import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import _ from 'lodash/lodash';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { computed } = Ember;
const { get, set, isEmpty } = Ember;

export default Model.extend({
  activity_type_ids: attr('integer-array'),
  email: attr('string'),
  name: attr('string'),
  suffix: attr('string'),
  lastname: attr('string'),
  labels: attr('string'),
  birthdate: attr('string'),
  gender: attr('string'),
  username: attr('string'),
  password: attr('string'),
  profile_picture: attr('string'),
  tmpPicture: attr('string'),
  tag_line: attr('string'),
  phone: attr('string'),
  ext_id: attr('string'),
  activity_ids: attr(''),
  user_role: attr('string'),

  messages: hasMany('message', { async: true }),
  conversations: hasMany('conversation', { async: true }),
  measurements: hasMany('measurement', { async: true }),
  activityTypes: computed('activity_type_ids', function() {
    let result = this.store.peekAll('activity-type').filter(item => get(this, 'activity_type_ids').includes(Number(get(item, 'id'))));
    return result;
  }),

  allowedActivityNames: computed('activity_type_ids', 'activityTypes', function() {
    let activities = _.flatten(get(this, 'activityTypes').map(item => get(item, 'activities')));
    return _.uniq(_.flatten(activities.map(item => get(item, 'name').trim())));
  }),

  fullName: computed('lastname', 'name', function() {
    return [get(this, 'name'), get(this, 'suffix'), get(this, 'lastname')].join(' ');
  }),

  age: computed('birthdate', function() {
    return moment().diff(moment(get(this, 'birthdate')), 'years');
  }),

  userLabels: computed('labels', function() {

    if(isEmpty(get(this, 'labels'))) {
      return []
    }
    return get(this, 'labels').split(',');
  }),
});

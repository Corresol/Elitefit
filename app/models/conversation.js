import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  recipients: attr('integer-array'),
  group_id: attr('string'),

  messages: hasMany('message', { async: true }),
  user: belongsTo('user', { async: false }),
  last_message: belongsTo('message', { async: false, inverse: 'lastOf' })
});

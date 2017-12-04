import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  content: attr('string'),
  user_id: attr('number'),
  date:    attr('date'),

  user: belongsTo('user'),
  conversation: belongsTo('conversation'),
  lastOf: belongsTo('conversation', { inverse: 'last_message' })
});

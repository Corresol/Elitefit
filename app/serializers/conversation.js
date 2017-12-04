import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

  attrs: {
    user: {embedded: 'always'},
    last_message: {embedded: 'always'}
  },

  keyForAttribute: function(key) {
    return Ember.String.underscore(key);
  }
});


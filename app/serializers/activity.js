import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

  //attrs: {
  //  reservations: {embedded: 'always'}
  //},

  keyForAttribute: function(key) {
    return Ember.String.underscore(key);
  }
});


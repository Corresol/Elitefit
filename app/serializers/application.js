import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

  keyForAttribute: function(key) {
    return Ember.String.underscore(key);
  },

  payloadKeyFromModelName: function(key) {
    return Ember.String.underscore(key);
  },
});


import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize(serialized) {
    return Ember.A(serialized);
  },

  serialize(deserialized) {
    return deserialized.map((number) => { return Number(number); });
  }
});

import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized / 1000;
  },

  serialize(deserialized) {
    return Math.round(deserialized * 1000);
  }
});

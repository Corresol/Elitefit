import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized / 10;
  },

  serialize(deserialized) {
    return Math.round(deserialized * 10);
  }
});

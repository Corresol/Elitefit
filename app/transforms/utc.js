import DS from "ember-data";

export default DS.Transform.extend({
  serialize: function(value) {
    return moment(value).format("YYYY-MM-DD");
  },

  deserialize: function(value) {
    return value;
  }
});

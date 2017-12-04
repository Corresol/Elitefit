import DS from 'ember-data';

export default DS.Model.extend({
  registeredOn: DS.attr('utc', { defaultValue() { return  new Date() } }),
  heartRateBpm: DS.attr('number')
});

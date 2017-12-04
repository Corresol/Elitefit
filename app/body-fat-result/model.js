import DS from 'ember-data';

export default DS.Model.extend({
  bodyFatInPercentage: DS.attr('asCM'),
  registeredOn: DS.attr('date', { defaultValue() { return  new Date() } })
});

import DS from 'ember-data';

export default DS.Model.extend({
  weightInGrams: DS.attr('asKG'),
  registeredOn: DS.attr('date', { defaultValue() { return  new Date() } }),
});

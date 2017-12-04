import DS from 'ember-data';

export default DS.Model.extend({
  registeredOn: DS.attr('utc', { defaultValue() { return  new Date() } }),

  weightInGrams: DS.attr('asKg'),
  bodyFatInPercentage: DS.attr('asPromille'),
  visceralFat: DS.attr('number'),
  metabolicAge: DS.attr('number'),
  muscleMassGrams: DS.attr('asKg')
});

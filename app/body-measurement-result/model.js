import DS from 'ember-data';

export default DS.Model.extend({
  registeredOn: DS.attr('utc', { defaultValue() { return  new Date() } }),
  neckInMm: DS.attr('asCM'),
  waistInMm: DS.attr('asCM'),
  thighInMm: DS.attr('asCM'),
  bustInMm: DS.attr('asCM'),
  hipInMm: DS.attr('asCM')
});

import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      "weight-result": this.store.findAll('weight-result'),
      "body-measurement-result": this.store.findAll('body-measurement-result'),
      "heart-rate-result": this.store.findAll('heart-rate-result'),
      "body-fat-result": this.store.findAll('body-fat-result'),
      "tanita-measurement-result": this.store.findAll('tanita-measurement-result')
    })
  }
});

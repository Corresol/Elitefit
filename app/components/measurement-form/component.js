import Ember from 'ember';

const { service } = Ember.inject;
const { get } = Ember;

export default Ember.Component.extend({
  notify: service('notify'),

  actions: {
    save() {
      get(this, 'measurement').save().then(() => {
        get(this, 'notify').success('Measurement saved successfuly!');
        get(this, 'cancel')();
      });
    },

    cancel() {
      get(this, 'cancel')();
    }
  }
});

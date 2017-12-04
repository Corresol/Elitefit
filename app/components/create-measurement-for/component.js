import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Component.extend({
  measurement: null,

  init() {
    this._super(...arguments);
    set(this, 'measurement', get(this, 'user.measurements').createRecord({ gender: get(this, 'user.gender') }));
  },

  willDestroyElement() {
    this._super(...arguments);
    if(get(this, 'measurement.isNew')) {
      get(this, 'measurement').destroyRecord();
    }
  },

  actions: {
    saveUser() {
      get(this, 'user').save();
    },

    save() {
      get(this, 'measurement').save().then(() => {
        get(this, 'cancel')();
      });
    },

    cancel() {
      get(this, 'cancel')();
    }
  }
});

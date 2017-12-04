import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Component.extend({
  waste: null,

  init() {
    this._super(...arguments);
    set(this, 'waste', get(this, 'user.wastes').createRecord());
  },

  willDestroyElement() {
    this._super(...arguments);
    if(get(this, 'waste.isNew')) {
      get(this, 'waste').destroyRecord();
    }
  },

  actions: {
    save() {
      get(this, 'waste').save().then(() => {
        get(this, 'cancel')();
      });
    },

    cancel() {
      get(this, 'cancel')();
    }
  }
});

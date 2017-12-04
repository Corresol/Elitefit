import Ember from 'ember';

const { service } = Ember.inject;
const { get, set } = Ember;

export default Ember.Component.extend({
  notify: service('notify'),

  actions: {
    update(values) {
      this.set('activityType.activityIds', values.getEach('id'));

    },
    save() {
      get(this, 'activityType').save().then(() => {
        get(this, 'notify').success('ActivityType saved successfuly!');
        get(this, 'cancel')();
      });
    },

    cancel() {
      get(this, 'cancel')();
    }
  }
});

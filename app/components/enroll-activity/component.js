import Ember from 'ember';

const { get, set, A, observer, Component} = Ember;

export default Component.extend({
  enrollable: null,
  isChecked:  false,
  isReserved: false,

  isEnrollable: observer('isChecked', function() {
    let activity_id = +get(this, 'activity.id'),
        is_checked = get(this, 'isChecked'),
        enrollable = get(this, 'enrollable'),
        index = enrollable.indexOf(activity_id);

    is_checked ? enrollable.push(activity_id) : (index >= 0) && enrollable.splice(index, 1);
    set(this, 'user.activity_ids', enrollable);
  }),

  init() {
    this._super(...arguments);
    let activities = get(this,'user.activity_ids'),
        activity_id = +get(this, 'activity.id'),
        index = activities.indexOf(activity_id),
        reservations = get(this, 'activity.reservations'),
        user_id = get(this, 'user.ext_id');

    reservations.filter( obj => {
      (obj.user_id === user_id.toString()) && set(this, 'isReserved', true);
    });

    set(this, 'enrollable', activities);
    (index >= 0) && set(this, 'isChecked', true);
  }
});

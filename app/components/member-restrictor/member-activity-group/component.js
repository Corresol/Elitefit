import Ember from 'ember';
import _ from 'lodash/lodash';
const { computed, get, set } = Ember;

export default Ember.Component.extend({
  selected: computed('member.activity_type_ids', function() {
    return get(this, 'member.activity_type_ids').indexOf(Number(get(this, 'activityGroup.id'))) > -1;
  }),

  actions: {
    toggleSelection() {
      const member = get(this, 'member');
      const oldActivityIds = get(member, 'activity_type_ids').toArray();

      if(get(this, 'selected')) {
        set(member, 'activity_type_ids',
            get(member, 'activity_type_ids').reject((item) => { return item === Number(get(this, 'activityGroup.id')) })
           );
      } else {
        get(member, 'activity_type_ids').push(Number(get(this, 'activityGroup.id')));
      }

      member.notifyPropertyChange('activity_type_ids');
      member.save().then(() => { }, () => {
        set(member, 'activity_type_ids', oldActivityIds);
      });
    }
  }
});

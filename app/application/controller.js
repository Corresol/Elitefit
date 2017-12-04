import Ember from 'ember';
const { inject } = Ember;

export default Ember.Controller.extend({
  cdv: inject.service("ember-cordova/platform"),
  showMenuToggle: Ember.computed('currentPath', function() {
    return this.get('currentPath').indexOf('member') > -1;
  })
});

import Ember from 'ember';

const { get, isPresent } = Ember;

export default Ember.Component.extend({
  classNames: ['link'],
  click() {
    if(isPresent(get(this, 'onclick'))) {
      get(this, 'onclick')();
    }
  }
});

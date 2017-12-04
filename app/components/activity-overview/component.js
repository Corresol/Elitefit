import Ember from 'ember';
const { get } = Ember;

export default Ember.Component.extend({
  setCurrentDay: '',
  classNames: ["col-sm-6", "col-md-4"],
  backgroundImage: Ember.computed('activity.image_url', function() {
    let background = this.get('activity.image_url');
    return Ember.String.htmlSafe("background-image: url(https://elitefit.opencontrolplus.com/" + background + ")");
  }),
});

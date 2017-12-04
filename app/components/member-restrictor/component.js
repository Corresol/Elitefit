import Ember from 'ember';
import _ from 'lodash';


const { $, computed, get } = Ember;

export default Ember.Component.extend({
  didInsertElement() {
    setTimeout(() => {
      $('table').floatThead({position: 'absolute'});
    }, 1000);
  }
});

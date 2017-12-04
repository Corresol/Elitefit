import Ember from 'ember';

const { get, computed } = Ember;

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['link'],
  setFieldValue: '',
  showManualInput: false,

  click() {
    this.set('showManualInput', true);
  },

  actions: {
    setFieldValue() {
      this.get('setFieldValue')(this.get('value'), this.get('oldValue'));
    },

    done() {
      this.set('showManualInput', false);
    }
  }

});

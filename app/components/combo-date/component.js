import Ember from 'ember';

export default Ember.TextField.extend({
  attributeBindings: ['data-template', 'data-format'],
  classNames: ['form-control', 'col-xs-5'],

  didInsertElement(e) {
    $(this.element).combodate({ minYear: '1930' });
  }
});

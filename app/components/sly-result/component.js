import Ember from 'ember';
const { inject, get, computed } = Ember;

export default Ember.Component.extend({
  store: inject.service(),
  slyOptions: {
    horizontal: 1,
    itemNav: 'forceCentered',
    smart: 1,
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    scrollBy: 1,
    speed: 300,
    elasticBounds: 1,
    dragHandle: 1,
    dynamicHandle: 1,
    clickBar: 1,
  },

  didRender() {
    let frame = new Sly(`#${this.elementId}`, get(this, 'slyOptions')).init();
    frame.toEnd(true);
  },

  totalize(item) {
    if(get(this, 'fields')) {
      return get(this, 'fields').reduce((currentValue, field) => {
        return currentValue + get(item, field.columnName);
      }, 0);
    } else {
      return get(item, get(this, 'field.columnName'));
    }
  },

  data: computed('modelName', 'model', {
    get() {
      return get(this, 'model')[get(this, 'modelName')].map((item) => {
        return { total: this.totalize(item), date: get(item, 'registeredOn') };
      });
    }
  })
});

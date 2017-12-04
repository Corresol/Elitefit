import Ember from 'ember';
import SweetAlertMixin from 'ember-sweetalert/mixins/sweetalert-mixin';

const { isEmpty, isBlank, isPresent, get, computed, inject, set } = Ember;
const { service } = inject;

export default Ember.Component.extend(SweetAlertMixin, {
  store: service(),
  slyFrame: null,
  classNames: ['input'],
  classNameBindings: ['isValid:is-valid:is-invalid'],
  isValid: false,
  start: 0,
  end: 100,
  step: 1,
  showInput: false,
  setFieldValue: '',
  slyOptions: {
    horizontal: 1,
    itemNav: 'forceCentered',
    smart: true,
    activateMiddle: true,
    activateOn: 'click',
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
  didInsertElement() {
    let sweetAlert = this.get('sweetAlert');
    sweetAlert({
      title: 'Datum meting',
      html: '<input id="registrationDate" type="date" value="" max="' + moment(new Date).format('YYYY-MM-DD') + '" />'
    }).then((e, d) => {
      let dateValue = moment(Ember.$('#registrationDate').val());

      this.setFieldValue(get(this, 'modelName'), 'registeredOn', new Date(dateValue));
    });
    const date = new Date();
    document.getElementById('registrationDate').valueAsDate = date;
    this.attachSly();
  },

  attachSly() {
    if(Ember.$(`#${this.elementId} .frame`).html()) {
      let frame = new Sly(`#${this.elementId} .frame`, get(this, 'slyOptions')).init();
      frame.toCenter(get(this, 'currentIndex'));
      frame.on('active', (_, index) => {
        let value = get(this, 'inputValues')[index]

        this.setFieldValue(get(this, 'modelName'), get(this, 'fieldDefinition').columnName, value);
        set(this, 'actualValue', value);
        set(this, 'oldValue', value);
        set(this, 'isValid', true);
        this.toggleProperty("showInput");
        this.notifyPropertyChange('actualValue');
        this.notifyPropertyChange('oldValue');
      });
      set(this, 'slyFrame', frame);
    }
  },
  currentValue: computed('fieldDefinition.columnName', 'modelName', 'actualValue', function() {
    let modelName = get(this, 'modelName');
    let fieldName = get(this, 'fieldDefinition').columnName;

    if(isPresent(get(this.records, modelName)) && !isBlank(get(this.records, modelName).get(fieldName))) {
      return get(this.records, modelName).get(fieldName);
    } else {
      let lastRecord = get(this, 'store').peekAll(modelName).rejectBy('isNew').get('lastObject');
      if(lastRecord) {
        set(this, 'actualValue', lastRecord.get(fieldName));
        set(this, 'isValid', true);
        this.get('setFieldValue')(modelName, fieldName, lastRecord.get(fieldName));
        return lastRecord.get(fieldName)
      }
    }

    return get(this, 'actualValue');
  }),
  currentIndex: computed('actualValue', 'fieldDefinition.columnName', function() {
    return get(this, 'inputValues').indexOf(get(this, 'currentValue'));
  }),
  inputValues: computed('fieldDefinition.{start,end,step}', {
    get() {
      const step = get(this, 'fieldDefinition.step');
      const end = get(this, 'fieldDefinition.end');
      let start = get(this, 'fieldDefinition.start');

      let valueRange = [];
      valueRange[0] = start;
      while(start + step <= end) {
        let res = start += step;
        valueRange[valueRange.length] = Math.round(res * 100) / 100;
      }

      return valueRange;
    }
  }),


  actions: {
    setFieldValue(value, oldValue) {
      let modelName = get(this, 'modelName');
      let fieldName = get(this, 'fieldDefinition').columnName;
      let indexOfValue = get(this, 'inputValues').indexOf(Number(value));
      if(indexOfValue > -1) {
        this.get('setFieldValue')(modelName, fieldName, value);
        this.set('actualValue', value);
        get(this, 'slyFrame').activate(get(this, 'inputValues').indexOf(Number(value)));
        set(this, 'isValid', true);
      } else {
        if(isPresent(oldValue)) {
          set(this, 'actualValue', oldValue);
        }
      }
      this.notifyPropertyChange('actualValue');
    },

    toggleInput() {
      this.toggleProperty("showInput");
      if (get(this, "showInput")) {
        setTimeout(() => {
          this.attachSly();
        },0);
      }
    }
  }
});

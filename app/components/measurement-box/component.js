import Ember from 'ember';
const { computed, inject, isEmpty, isPresent, get, set } = Ember;

export default Ember.Component.extend({
  store: inject.service(),
  records: null,
  didInsertElement() {
    set(this, 'records', new Ember.Object())
  },

  filteredFields: computed('measurement.fields', function() {
    return get(this, 'measurement.fields').reject((field) => {
      let filter = field.filter;

      if(isEmpty(filter)) { return false; }

      return Object.keys(filter).map((f) => {
        return (get(this, f).toLowerCase() === filter[f].toLowerCase());
      }).includes(true);
    });
  }),

  allValid: computed('measurement','validate', function() {
    let measurement = get(this, 'measurement');
    let modelName = measurement.modelName;
    let record = get(this.records, modelName);

    if(isPresent(record)) {
      let emptyRecordCount = get(this, 'filteredFields').filter((field) => {
        if (isEmpty(record.get(field.columnName))) {
          return true;
        }
      }).length;
      return emptyRecordCount === 0;
    }
  }),
  actions: {
    setFieldValue(modelName, property, value) {
      this.notifyPropertyChange("validate");
      let record = get(this.records, modelName);
      if(isEmpty(record)) {
        record = get(this, 'store').createRecord(modelName, {});
        set(this.records, modelName, record)
      }
      record.set(property, value);
    },

    addResult(modelName) {
      this.notifyPropertyChange("validate");
      let record = get(this.records, modelName);
      record.save().then(() => {
        this.setProperties({
          isAdding: false,
          records: new Ember.Object()
        });
      });
    },

    toggleAdd(modelName) {
      let record = get(this.records, modelName);

      if(isPresent(record) && get(record, 'isNew') && get(this, 'isAdding')) {
        set(this.records, modelName, null);
        record.destroyRecord();
      }

      this.toggleProperty("isAdding");
      this.notifyPropertyChange("validate");
    }
  }
});

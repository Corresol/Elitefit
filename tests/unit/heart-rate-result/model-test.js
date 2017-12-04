import { moduleForModel, test } from 'ember-qunit';

moduleForModel('heart-rate-result', 'Unit | Model | heart rate result', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

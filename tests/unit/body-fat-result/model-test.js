import { moduleForModel, test } from 'ember-qunit';

moduleForModel('body-fat-result', 'Unit | Model | body fat result', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('member-restrictor/member-activity-group', 'Integration | Component | member restrictor/member activity group', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{member-restrictor/member-activity-group}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#member-restrictor/member-activity-group}}
      template block text
    {{/member-restrictor/member-activity-group}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

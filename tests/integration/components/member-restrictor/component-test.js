import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('member-restrictor', 'Integration | Component | member restrictor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{member-restrictor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#member-restrictor}}
      template block text
    {{/member-restrictor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

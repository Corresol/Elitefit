import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('picture-cropper', 'Integration | Component | picture cropper', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{picture-cropper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#picture-cropper}}
      template block text
    {{/picture-cropper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

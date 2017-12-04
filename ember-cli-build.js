/*jshint node:true*/
/* global require, module */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var plugins = [];

  // plugins = ['icheck', 'datepicker', 'bootstrap-wysihtml5', 'daterangepicker', 'jvectormap', 'select2', 'input-mask'];

  var app = new EmberApp(defaults, {
    "ember-cli-babel": {
      includePolyfill: true
    },
    // You might want to disable jshint as it does
    // not support async/await yet.
    hinting: false
  });

  app.import(app.bowerDirectory + "/combodate/src/combodate.js");
  app.import(app.bowerDirectory + "/jquery.floatThead/dist/jquery.floatThead.min.js");
  app.import(app.bowerDirectory + '/sly/dist/sly.min.js');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};

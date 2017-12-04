/* eslint-env node */

var os = require('os');
module.exports = function(environment) {
  var interfaces = os.networkInterfaces();
  var addresses = [];

  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }

  console.log(addresses);
  var ip = addresses[0];
  var ENV = {
    ip: ip,
    modulePrefix: 'elitefit-member',
    environment: environment,
    baseURL: '',

    moment: {
      includeLocales: true,
      allowEmpty: true
    },
    locationType: 'hash',
    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' *",
      'font-src': "'self' 'unsafe-inline' maxcdn.bootstrapcdn.com fonts.googleapis.com fonts.gstatic.com",
      'connect-src': "'self' ws://" + ip + ":4000",
      'img-src': "'self' * data:",
      'style-src': "'self' 'unsafe-inline' maxcdn.bootstrapcdn.com fonts.googleapis.com"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        Date: false,
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'ember-simple-auth': {
      authorizer: 'authorizer:token',
      crossOriginWhitelist: ['https://v2.elite.fit', 'https://api.elite.fit/', 'https://staging-api.elite.fit/', 'http://' + ip + ':4000/'],
      routeAfterAuthentication: 'member.reservations',
      routeIfAlreadyAuthenticated: 'member.reservations',
      authenticationRoute: 'login',
    },

    'ember-simple-auth-token': {
      serverTokenEndpoint: '/api/session', // The route for logging in
      identificationField: 'username', // Our login expects username
      passwordField: 'password',
      tokenPropertyName: 'token', // Token is returned back as token key
      timeFactor: 1000, // Needed since expiration sent in ms
      authorizationPrefix: null, // Don't set a prefix, guardian doesn't like
      authorizationHeaderName: 'Authorization' // Tell ember-simple-auth-token which header to place the token in
    },

    'ember-form-for': {
      buttonClasses: ['btn btn-info pull-right'],
      fieldClasses: ['form-group'],
      fieldErrorClass: 'form-field--has-errors',
      errorClasses: ['form-field--errors'],
      hintClasses: ['form-field--hint'],
      inputClasses: ['form-control'],
      labelClasses: [''],
      resetClasses: ['form-button--reset'],
      submitClasses: ['form-button--submit']
    }
  };

  if (environment === 'development') {
    //ENV.host = 'http://' + ip + ':4000';
    //ENV.socket = 'ws://' + ip + ':4000/socket';
    ENV.host = 'https://v2.elite.fit';
    ENV.socket = 'wss://v2.elite.fit/socket';
    // ENV.host = 'https://staging-api.elite.fit';
    // ENV.socket = 'wss://staging-api.elite.fit/socket';
    // ENV.host = 'https://api.elite.fit';
    // ENV.socket = 'wss://api.elite.fit/socket';
    //ENV.host = 'https://api.elite.fit';

    //ENV.APP.LOG_RESOLVER = true;
    //ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    //ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.host = 'https://staging-api.elite.fit';
    ENV.socket = 'wss://staging-api.elite.fit/socket';
  }

  if (environment === 'production') {
    ENV.host = 'https://v2.elite.fit';
    ENV.socket = 'wss://v2.elite.fit/socket';
  }

  return ENV;
};

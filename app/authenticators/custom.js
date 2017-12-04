import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from '../config/environment';

export default Base.extend({
    tokenEndpoint: ENV.host + '/api/session',
    restore: function(data) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        if (!Ember.isEmpty(data.token)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },

    authenticate: function(options) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.$.ajax({
          url: this.tokenEndpoint,
          type: 'POST',
          data: JSON.stringify({
            user: options.identification,
            password: options.password,
            deviceID: null
          }),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json'
        }).then(function(response) {
          Ember.run(function() {
            resolve({
              token: response.token,
              user: response.user
            });
          });
        }, function(xhr, status, error) {
          var response = xhr.responseText;
          Ember.run(function() {
            reject(response);
          });
        });
      });
    },

    invalidate: function() {
        console.log('invalidate...');
        return Ember.RSVP.resolve();
    }
});

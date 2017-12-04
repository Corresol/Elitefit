import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'elitefit-member/config/environment';

const { ip } = ENV;
const { inject, computed, get } = Ember;

export default AjaxService.extend({
  trustedHosts: [
    'staging-api.elite.fit',
    'api.elite.fit',
    'v2.elite.fit',
    'member.elite.fit',
    'localhost',
    ip
  ],
  session: inject.service(),
  getHeaders() {
    let headers = {};
    get(this, 'session').authorize('authorizer:token', (headername, headervalue) => {
      headers[headername] = headervalue;
    });
    return headers;
  },
  headers: computed('session.authToken', function() {
    return this.getHeaders();
  })
});


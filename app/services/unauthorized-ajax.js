import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';

const { inject, computed, get } = Ember;

export default AjaxService.extend({
  trustedHosts: [
    /\.elitefit\./,
    'localhost',
  ],
  host: ENV.host
});



import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('member', function() {
    this.route('about');
    this.route('account');
    this.route('filters');
    this.route('loading');
    this.route('reservations');
    this.route('activity', { path: '/activity/:activity_id' });
    this.route('results');
    this.route('upload-picture');
    this.route('dashboard');
  });
  this.route('login', { path: '' });
  this.route('registration');
  this.route('loading');
  this.route('recover');
});

export default Router;

import Ember from 'ember';
import ENV from 'elitefit-member/config/environment';
import Phoenix from 'ember-phoenix-chan';

const { get, set, inject, computed } = Ember;
const { service } = inject;
const { Socket, Channel } = Phoenix;
const { host } = ENV;

export default Ember.Service.extend({
  store: service(),
  channel: null,
  init() {
    this._super(...arguments);

    let socket = new Socket(ENV.socket),
        channel = socket.channel('activities:lobby');

    set(this, 'channel', channel);

    socket.connect();

    channel.on('update_activities', this.updateActivity.bind(this));
    channel.join();
  },

  updateActivity({ activity_id }) {
    let activity = this.get('store').peekRecord('activity', activity_id);
    activity.get('reservations').reload();
  },
});

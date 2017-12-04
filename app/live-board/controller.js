import Ember from 'ember';
import Phoenix from 'ember-phoenix-chan';
import ENV from 'elitefit-member/config/environment';

const { Socket, Channel } = Phoenix;
const { get, set} = Ember;

export default Ember.Controller.extend({
  channel: null,

  init() {
    this._super(...arguments);

    let socket = new Socket(ENV.socket),
        channel = socket.channel('activities:lobby');

    set(this, 'channel', channel);

    socket.connect();
    channel.join();
    console.log('joined');

    channel.on('update_activities', (object) => {
      this.store.findRecord('activity', object.activity_id).then((item) => {
        item.reload();
      });
    });
  }
});

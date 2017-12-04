import Ember from 'ember';
import Phoenix from 'ember-phoenix-chan';
import ENV from '../../config/environment';

const { service } = Ember.inject;
const { $, get, set } = Ember;
const {Socket, Channel} = Phoenix;

export default Ember.Component.extend({
  currentUser: service('current-user'),
  classNames: ['conversation'],
  messageContent: '',
  channel: null,

  didRender() {
    $('#conversation-messages').stop().animate({
      scrollTop: $('#conversation-messages')[0].scrollHeight
    }, 800);
  },

  didReceiveAttrs() {
    let socket = new Socket(ENV.socket);
    let channel = socket.channel(`chat:${get(this, 'conversation.group_id')}`)
    set(this, 'channel', channel);

    socket.connect();
    channel.join();
    console.log('joined ', get(this, 'conversation.group_id'));

    channel.on('new_msg', (message) => {
      get(this, 'conversation.messages').reload();
      $('#conversation-messages').stop().animate({
          scrollTop: $('#conversation-messages')[0].scrollHeight
      }, 800);
    });
  },

  willDestroy() {
    if(Ember.isPresent(get(this, 'channel'))) {
      get(this, 'channel').leave();
      console.log('destroyed');
    }
  },

  sendMessage(value) {
    get(this, 'channel').push('new_msg', {
      text: value,
      userId: get(this, 'currentUser.user.id')
    }, 1000)
    .receive('ok', (msg) => { console.log('OK'); })
    .receive('error', (msg) => { console.log('Error'); })
    .receive('timeout', (msg) => { console.log('Time - out!'); })
  },

  actions: {
    sendMessage(value) {
      this.sendMessage(value);
      set(this, 'messageContent', '');
    }
  }
});

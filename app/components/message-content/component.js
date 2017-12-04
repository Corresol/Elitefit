import Ember from 'ember';

const { service } = Ember.inject;
const { computed, get } = Ember;

export default Ember.Component.extend({
  conversationMessages: Ember.A([]),
  currentUser: service('current-user'),
  classNames: ['direct-chat-msg'],
  classNameBindings: ['isCurrentUser:right:left'],

  isCurrentUser: computed('currentUser.user.id', function() {
    return Number(get(this, 'currentUser.user.id')) === Number(get(this, 'message.user_id'));
  }),

  previousMessage: computed('index', function() {
    return get(this, 'conversationMessages').toArray()[get(this, 'index') - 1];
  }),

  previousMessageFromSameUser: computed(function() {
    if(get(this, 'previousMessage')) {
      return get(this, 'previousMessage.user_id') === get(this, 'message.user_id');
    } else {
      return false;
    }
  })





});

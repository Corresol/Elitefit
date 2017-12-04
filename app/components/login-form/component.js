import Ember from 'ember';
import ENV from 'elitefit-member/config/environment';

const { service } = Ember.inject;
const { get, set, computed } = Ember;

export default Ember.Component.extend({
  host: ENV.host,
	ajax: Ember.inject.service(),
  registration: false,
  session: service(),
  user: computed.alias('session.session.authenticated.user'),
  showPassword: false,

  passwordType: computed("showPassword", function() {
    return get(this, 'showPassword') ? 'text' : 'password'
  }),

  actions: {
    togglePasswordType() {
      this.toggleProperty('showPassword');
    },
    toggleRegistration() {
      this.toggleProperty('registration');
      set(this, 'errorMessage', null);
		},
		activate() {
      set(this, 'errorMessage', null);
			let attributes = this.getProperties(
				'username',
				'password',
			);

      let user = this.get('session.session.authenticated.user')
      attributes.extID = user.ext_id;
      attributes.email = user.email;

      if(Ember.isEmpty(attributes.password) ||
         Ember.isEmpty(attributes.username)) {
          set(this, 'errorMessage', { errors: [{ detail: "Geen geldige invoer" }] });
          return false;
        }

			get(this, 'ajax').request(`${get(this, 'host')}/api/users/register`, {
				method: 'POST',
				data: {
					user: attributes
				}
      })
      .then(() => {
        set(this, 'identification', attributes.username);
        set(this, 'password', attributes.password);
        set(user, 'username', attributes.username);

        this.get('goToReservations')();
      })
      .catch((reason) => {
        console.log(reason);
        let errorReason = reason;
        set(this, 'errorMessage', reason.error || errorReason);
      });
		},
    authenticate: function() {
      let credentials = this.getProperties('identification', 'password');
      let authenticator = 'authenticator:custom';

      if(Ember.isEmpty(credentials.identification) || Ember.isEmpty(credentials.password)) {
        set(this, 'errorMessage', { errors: [{ detail: "Geen geldige invoer" }] });
        return false;
      }

      get(this, 'session').authenticate(authenticator, credentials).catch((reason) => {
        let errorReason = JSON.parse(reason);
        set(this, 'errorMessage', errorReason.error || errorReason);
      });
    }
  }
});

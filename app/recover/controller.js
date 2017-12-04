import Ember from 'ember';

const { set, get, inject } = Ember;

export default Ember.Controller.extend({
  queryParams: ['recoveryAction', 'token'],
  token: null,
  errorMessage: null,
  recoveryAction: 'recover',
  ajax: inject.service('unauthorized-ajax'),
  actions: {
    updatePassword() {
      return get(this, 'ajax').request('/api/member/update_password', {
        method: 'PUT',
        data: {
          token: get(this, 'token'), new_password: get(this, 'newPassword')
        }
      }).then(() => {
        set(this, 'newPassword', null);
        set(this, 'token', null);
        set(this, 'errorMessage', null);
        this.transitionToRoute('login');
      }).catch((e) => {
        set(this, 'errorMessage', e);
      });
    },
    recover() {
      get(this, 'ajax').request('/api/member/recover', {
        method: 'GET',
        data: {
          identification: get(this, 'identification')
        }
      }).then(() => {
        set(this, 'identification', null);
        set(this, 'errorMessage', null);
        set(this, 'recoveryAction', 'recovering');
      });
    }
  }
});

import Ember from 'ember';
import ENV from 'elitefit-member/config/environment';
import SweetAlertMixin from 'ember-sweetalert/mixins/sweetalert-mixin';
import InViewportMixin from 'ember-in-viewport';

const { get, set, computed, Component, isBlank, inject } = Ember;
const { service } = inject;
const { host } = ENV;

export default Component.extend(SweetAlertMixin, InViewportMixin, {
  reservationChannel: inject.service(),
  setCurrentDay: '',
  aajax: service('authorized-ajax'),
  isLoading: false,
  viewportOptionsOverride: Ember.on('didInsertElement', function() {
    Ember.setProperties(this, {
      viewportEnabled           : true,
      viewportUseRAF            : true,
      viewportSpy               : true,
      viewportScrollSensitivity : 1,
      viewportRefreshRate       : 150,
      viewportTolerance: {
        top    : 50,
        bottom : 50,
        left   : 20,
        right  : 20
      }
    });
  }),

  canReserve: computed('activity.available', function() {
    return Number(get(this, 'activity.available')) > 0;
  }),

  reservationText: computed('activity.availability', function() {
    if (get(this, 'activity.availability') === "VOL") {
      return "Wachtlijst"
    } else {
      return "Reserveren"
    }
  }),

  reserved: computed('activity.reservations.@each.reserved', function() {
    return get(this, 'activity.reservations').any(item => item.get('reserved'));
  }),

  waiting: computed('activity.current_user_id', 'activity.waitings', function() {
    if(isBlank(get(this, 'activity.waitings'))) {
      return false;
    }
    return get(this, 'activity.waitings').filter((item) => {
      if(isBlank(get(this, 'activity.current_user_id'))) {
        return false;
      }

      return get(item, 'user_id').toString() === get(this, 'activity.current_user_id').toString();
    }).length > 0;
  }),

  myReservations() {
    return get(this, 'activity.store').peekAll('reservation').filter(reservation => reservation.get('reserved'));
  },

  handleError({payload}) {
    let sweetAlert = this.get('sweetAlert');
    if(isBlank(payload)) {
      sweetAlert({ text: 'Reserveren mislukt: probeer het later nog eens' });
    } else {
      sweetAlert({ text: payload.error });
      if(payload.error.indexOf("101")) {
        get(this, 'activity.waitings').reload();
      }
    }

    setTimeout(() => {
      set(this, 'isLoading', false);
    }, 2000);
  },

  didEnterViewport() {
    let dayName = get(this, 'day');
    if(!isBlank(dayName)) {
      get(this, 'setCurrentDay')(dayName);
    }
  },

  didExitViewport() {
    let dayName = get(this, 'day');
    if(!isBlank(dayName)) {
      get(this, 'setCurrentDay')(dayName);
    }
  },

  actions: {
    waiting() {
      let sweetAlert = this.get('sweetAlert');

      sweetAlert({ text: 'Bij beschikbaarheid, krijgen de leden op de wachtlijst (op volgorde van aanmelden) een mail om te kunnen reserveren.' });
    },
    add() {
      set(this, 'isLoading', true);
      this.get('aajax').raw(host + '/api/reservations', {
        method: 'GET',
        data: {
          member_id: get(this, 'activity.current_user_id'),
          activity_id: get(this, 'activity.id')
        }
      }).then(({ response }) => {
        const data = { data: get(this, 'activity.add_reservation_pay_load') };
        let sweetAlert = this.get('sweetAlert');

        if(response.reservations.length > 3) {
          sweetAlert({ text: 'Voor deze week kunt u maximaal 3 lessen en 1 consult reserveren.' });
          set(this, 'isLoading', false);
          return false;
        }
        return this.get('aajax').raw(host + '/api/reservations', {
          method: 'POST',
          data: data
        }).then((response) => {
          get(this, 'activity.reservations').reload();
          // get(this, 'activity').addReservation();
          setTimeout(() => {
            set(this, 'isLoading', false);
          }, 2000);
          get(this, 'reservationChannel.channel').push('update_activities', { activity_id: get(this, 'activity.id') }, 1000);
        }).catch(this.handleError.bind(this));
      });
    },

    remove() {
      set(this, 'isLoading', true);
      const data = { data: get(this, 'activity.remove_reservation_pay_load') };
      const currentReservation = this.myReservations().find(reservation => reservation.get('activity.id') === get(this, 'activity.id'));
      return this.get('aajax').raw(host + '/api/reservations/' + currentReservation.get('id'), {
        method: 'DELETE',
        data
      }).then(() => {
        get(this, 'reservationChannel.channel').push('update_activities', { activity_id: get(this, 'activity.id') }, 1000);
        currentReservation.unloadRecord();
        setTimeout(() => {
          if(Ember.isPresent(this)) {
            set(this, 'isLoading', false);
          }
        }, 2000);
      }).catch(this.handleError.bind(this))
    }
  }

});

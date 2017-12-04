import Ember from 'ember';

export default Ember.Component.extend({
  didRender: () => {
    $(".content-wrapper").css("min-height", $(window).height() - 100);
  }
});

import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import ENV from '../../config/environment';

const { service } = Ember.inject;
const { get, set } = Ember;

export default EmberUploader.FileField.extend({
  filesDidChange(files) {
    if (!Ember.isEmpty(files)) {
      // this second argument is optional and can to be sent as extra data with the upload
      let r = new FileReader;
      r.onloadend = (e) => {
        get(this, 'setPicture')(e.target.result);
      };
      r.readAsDataURL(files[0]);
    }
  }
});

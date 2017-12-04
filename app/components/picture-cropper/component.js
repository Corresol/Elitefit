import imageCropper from 'ember-cli-image-cropper/components/image-cropper';
import EmberUploader from 'ember-uploader';
import ENV from '../../config/environment';
const { service } = Ember.inject;
const { get, set } = Ember;

export default imageCropper.extend({
  session: service(),
  currentUser: service('current-user'),
  authorizedAjax: service(),
  isLoading: false,
  //override default options of cropper
  aspectRatio: 1,
  minCropBoxWidth: 100,
  minCropBoxHeight: 100,
  cropperContainer: '.cropper-container > img',
  previewClass: '.img-preview',
  croppedAvatar: null,
  url: ENV.host + '/api/upload_profile_picture',
  model: null,
  zoomable: true,
  rotateable: true,

  fileIsChanged: Ember.observer('currentUser.tmpPicture', function() {
    this.initImageCropper();
  }),

  getHeaders() {
    let headers = {};
    get(this, 'session').authorize('authorizer:token', (headername, headervalue) => {
      headers[headername] = headervalue;
    });
    return headers;
  },

  uploadCanvas(dataURL) {
    set(this, 'isLoading', true);
    let blobBin = atob(dataURL.split(',')[1]);
    let array = [];
    for(let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    let mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    let file = new Blob([new Uint8Array(array)], {type: mimeString});

    const uploader = EmberUploader.Uploader.create({
      url: get(this, 'url'),
      ajaxSettings: { headers: this.getHeaders() }
    });

    let formdata = new FormData();

    formdata.append("file", file, 'rachid.png');

    get(this, 'authorizedAjax').raw(get(this, 'url'), {
      method: 'POST',
      data: formdata,
      processData: false,
      contentType: false
    }).then(({ response, jqXHR, payload }) => {
      set(this, 'model.profile_picture', response.picture.url);
      get(this, 'model').save().then(() =>{
        set(this, 'isLoading', false);
        history.back();
      });
    }).catch(({ response, jqXHR, payload }) => {
      console.log('mislukt');
      set(this, 'isLoading', false);
    });
  },

  actions: {
    cancel() {
      history.back()
    },

    browse() {
      let fileInput = this.$("input");
      fileInput.click();
    },

    getCroppedAvatar() {
      let container = this.$(this.get('cropperContainer'));
      let croppedImage = container.cropper('getCroppedCanvas');
      this.set('croppedAvatar', croppedImage);
      this.uploadCanvas(croppedImage.toDataURL("image/png"));
    },

    setPicture(image) {
      let container = this.$(this.get('cropperContainer'));
      container.attr('src', image);
      this.initImageCropper();

      container.cropper('replace', image);
    }
  }
});

import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForCreateRecord(modelName, snapshot) {
    return `${this.get('host')}/${this.get('namespace')}/users/${snapshot.record.get('user.id')}/measurements`;
  }
});

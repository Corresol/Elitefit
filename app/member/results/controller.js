import Ember from 'ember';

const {
  isEmpty, get, set, inject
} = Ember;

export default Ember.Controller.extend({
  // use this to show th  different measurement sliders and results
  // including instruction video's
  currentUser: inject.service('current-user'),
  measurements: [
    {
      title: "Tanita meting",
      type: "single",
      modelName: 'tanita-measurement-result',
      fields: [
        {
          label: 'Gewicht (kg)',
          columnName: 'weightInGrams',
          step: 0.1,
          start: 50,
          end: 150
        },
        {
          label: 'Vetpercentage (%)',
          columnName: 'bodyFatInPercentage',
          step: 0.1,
          start: 3,
          end: 50
        },
        {
          label: 'Spiermassa (kg)',
          columnName: 'muscleMassGrams',
          step: 0.1,
          start: 5,
          end: 100
        },
        {
          label: 'Je echte leeftijd',
          columnName: 'metabolicAge',
          step: 1,
          start: 1,
          end: 100
        },
        {
          label: 'Visceraal vet',
          columnName: 'visceralFat',
          step: 1,
          start: 1,
          end: 20
        },
      ],
      instructionUrl: '',
      instructionTitle: 'Hoe meet ik mijn gewicht'
    },
    {
      title: "Omtrekmeting (cm)",
      modelName: 'body-measurement-result',
      type: "sum",
      fields: [
        {
          label: 'Nek',
          columnName: 'neckInMm',
          step: 0.5,
          start: 20,
          end: 50
        },
        {
          label: 'Taille',
          columnName: 'waistInMm',
          step: 0.5,
          start: 60,
          end: 150
        },
        {
          label: 'Borst',
          columnName: 'bustInMm',
          step: 0.5,
          start: 70,
          end: 150
        },
        {
          label: 'Heup',
          columnName: 'hipInMm',
          step: 0.5,
          start: 70,
          end: 150,
          filter: {
            'user.gender': 'M',
          }
        },
        {
          label: 'Been',
          columnName: 'thighInMm',
          step: 0.5,
          start: 30,
          end: 100
        },
      ],
      instructionUrl: '',
      instructionTitle: 'Hoe meet ik mijn omtrek'
    },
    {
      title: "Hartslag (per min)",
      modelName: 'heart-rate-result',
      type: "sum",
      fields: [
        {
          columnName: 'heartRateBpm',
          step: 1,
          start: 30,
          end: 100
        }
      ],
      instructionUrl: '',
      instructionTitle: 'Hoe meet ik mijn hartslag'
    },
  ]
});

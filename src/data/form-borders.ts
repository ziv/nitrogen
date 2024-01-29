import { FieldsetInput, FieldsetTypes } from '../app/components/fieldset';

const props = {
  min: 0,
  max: 100,
};

export default {
  legend: 'Border',
  sections: [
    {
      label: 'Radius',
      items: [
        {
          type: FieldsetTypes.Range,
          label: 'Top Left',
          control: 'tl',
          props
        },
        {
          type: FieldsetTypes.Range,
          label: 'Top Right',
          control: 'tr',
          props
        },
        {
          type: FieldsetTypes.Range,
          label: 'Bottom Right',
          control: 'br',
          props
        },
        {
          type: FieldsetTypes.Range,
          label: 'Bottom Left',
          control: 'bl',
          props
        }
      ]
    }
  ]
} as FieldsetInput;

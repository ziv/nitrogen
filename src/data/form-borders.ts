import { FieldsetInput, FieldsetTypes } from '../app/components/fieldset';

const props = {
  min: 0,
  max: 100,
};

export default {
  legend: 'Border',
  sections: [
    {
      items: [
        {
          type: FieldsetTypes.Range,
          label: 'Width',
          control: 'borderWidth',
          props: {
            min: 0,
            max: 5,
          }
        },
        {
          type: FieldsetTypes.Color,
          label: 'Color',
          control: 'borderColor'
        }
      ]
    },
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

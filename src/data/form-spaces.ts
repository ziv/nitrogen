import { FieldsetInput, FieldsetTypes } from '../app/components/fieldset';

const props = {
  min: 0,
  max: 100,
};

export default {
  legend: 'Spacing',
  sections: [
    {
      label: 'Internal',
      items: [
        {
          type: FieldsetTypes.Range,
          label: 'Top',
          control: 'top',
          props
        },
        {
          type: FieldsetTypes.Range,
          label: 'Right',
          control: 'right',
          props
        },
        {
          type: FieldsetTypes.Range,
          label: 'Bottom',
          control: 'bottom',
          props
        },
        {
          type: FieldsetTypes.Range,
          label: 'Left',
          control: 'left',
          props
        }
      ]
    },
    {
      label: 'External',
      items: [
        {
          type: FieldsetTypes.Range,
          label: 'Top',
          control: 'marginTop',
          props
        },
        {
          type: FieldsetTypes.Range,
          label: 'Right',
          control: 'marginRight',
          props
        },
        {
          type: FieldsetTypes.Range,
          label: 'Bottom',
          control: 'marginBottom',
          props
        },
        {
          type: FieldsetTypes.Range,
          label: 'Left',
          control: 'marginLeft',
          props
        }
      ]
    }
  ]
} as FieldsetInput;

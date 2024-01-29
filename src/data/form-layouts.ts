import { FieldsetInput, FieldsetTypes } from '../app/components/fieldset';

export default {
  legend: 'Layout',
  sections: [
    {
      label: '',
      items: [
        {
          type: FieldsetTypes.Color,
          label: 'Background Color',
          control: 'backgroundColor',
        },
        {
          type: FieldsetTypes.Checkbox,
          label: 'Transparent Background',
          control: 'transparent',
        },
        {
          type: FieldsetTypes.Checkbox,
          label: 'Display Icons',
          control: 'displayIcons',
        },
        {
          type: FieldsetTypes.Checkbox,
          label: 'Display Header',
          control: 'displayHeader',
        },
        {
          type: FieldsetTypes.Checkbox,
          label: 'Display Title',
          control: 'displayTitle',
        },
        {
          type: FieldsetTypes.Text,
          label: 'Title',
          control: 'title',
          condition: value => value.displayTitle,
        },
      ],
    },
  ]
} as FieldsetInput;

import { type FieldsetInput, FieldsetTypes } from '../app/components/fieldset';
import themes from './themes';
import languages from './languages';

export default {
  legend: 'Highlight',
  sections: [
    {
      items: [
        {
          type: FieldsetTypes.Select,
          label: 'Theme',
          control: 'theme',
          options: themes
        },
      ]
    },
    {
      items: [
        {
          type: FieldsetTypes.Select,
          label: 'Language',
          control: 'language',
          options: languages
        },
      ]
    }
  ]
} as FieldsetInput;

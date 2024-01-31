import { FieldsetInput, FieldsetTypes } from '../app/components/fieldset';
import themes from './themes';
import languages from './languages';

const props = {
  min: 0,
  max: 100,
};

export default [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    legend: 'Export',
    sections: [
      {
        items: [
          {
            type: FieldsetTypes.Range,
            label: 'Sizing',
            control: 'sizing',
            props: {
              min: .5,
              max: 4,
              step: .5,
            },
          },
        ],
      }
    ]
  }
] as FieldsetInput[];

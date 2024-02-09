import { FieldsetInput, FieldsetTypes } from '../app/components/fieldset';
import themes from './themes';
import languages from './languages';
import { RenderOutput } from '../app/nitrogen/nitrogen';

const props = {
  min: 0,
  max: 100,
};

export default [
  {
    legend: 'Layout',
    group: 'layout',
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
            condition: value => value['displayTitle'],
          },
        ],
      },
    ]
  },
  {
    legend: 'Header',
    group: 'header',
    sections: [
      {
        items: [
          {
            type: FieldsetTypes.Checkbox,
            label: 'Display',
            control: 'display',
          },
          {
            type: FieldsetTypes.Text,
            label: 'Title',
            control: 'title',
            condition: value => value['display'],
          },
          {
            type: FieldsetTypes.Checkbox,
            label: 'Transparent Background',
            control: 'transparent',
            condition: value => value['display'],
          },
          {
            type: FieldsetTypes.Color,
            label: 'Background Color',
            control: 'backgroundColor',
            condition: value => !value['transparent'],
          },
        ],
      },
    ],
  },
  {
    legend: 'Icons',
    group: 'icons',
    sections: [
      {
        items: [
          {
            type: FieldsetTypes.Checkbox,
            label: 'Display',
            control: 'display',
          },
          {
            type: FieldsetTypes.Range,
            label: 'Radius',
            control: 'radius',
            props: {min: 0, max: 50},
            unit: '%',
          },
          {
            type: FieldsetTypes.Icons,
            label: 'Icons',
            control: 'icons'
          }
        ],
      },
    ],
  },
  {
    legend: 'Border',
    group: 'borders',
    sections: [
      {
        items: [
          {
            type: FieldsetTypes.Range,
            label: 'Width',
            control: 'width',
            props: {
              min: 0,
              max: 5,
            }
          },
          {
            type: FieldsetTypes.Color,
            label: 'Color',
            control: 'color'
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
    group: 'spacing',
    sections: [
      {
        label: 'Internal',
        items: [
          {
            type: FieldsetTypes.Range,
            label: 'Top',
            control: 'pt',
            props
          },
          {
            type: FieldsetTypes.Range,
            label: 'Right',
            control: 'pr',
            props
          },
          {
            type: FieldsetTypes.Range,
            label: 'Bottom',
            control: 'pb',
            props
          },
          {
            type: FieldsetTypes.Range,
            label: 'Left',
            control: 'pl',
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
            control: 'mt',
            props
          },
          {
            type: FieldsetTypes.Range,
            label: 'Right',
            control: 'mr',
            props
          },
          {
            type: FieldsetTypes.Range,
            label: 'Bottom',
            control: 'mb',
            props
          },
          {
            type: FieldsetTypes.Range,
            label: 'Left',
            control: 'ml',
            props
          }
        ]
      }
    ]
  },
  {
    legend: 'Highlight',
    group: 'code',
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
    group: 'export',
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
          {
            type: FieldsetTypes.Select,
            label: 'Type',
            control: 'render',
            options: [
              {value: RenderOutput.PNG, label: 'PNG'},
              {value: RenderOutput.SVG, label: 'SVG'}
            ]
          }
        ],
      }
    ]
  }
] as FieldsetInput[];

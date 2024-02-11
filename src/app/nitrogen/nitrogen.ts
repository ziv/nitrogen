import { FormBuilder } from '@angular/forms';
import { FieldsetInput, FieldsetTypes } from '../components/fieldset';
import { NitIcon } from '../components/icons-field';

export enum RenderOutput {
  PNG,
  SVG
}

export async function nitroDef() {
  return import('../../data/nitrogen-forms').then(m => m.default);
}

export function nitroForm(fieldsetInputs: FieldsetInput[]) {
  const fb = new FormBuilder();
  const map: Record<FieldsetTypes, unknown> = {
    [FieldsetTypes.Icons]: [],
    [FieldsetTypes.Checkbox]: true,
    [FieldsetTypes.Range]: 0,
    [FieldsetTypes.Number]: 0,
    [FieldsetTypes.Text]: '',
    [FieldsetTypes.Select]: '',
    [FieldsetTypes.Color]: '',
  };
  const root: Record<string, unknown> = {};
  for (const group of fieldsetInputs) {
    const sub: Record<string, unknown> = {};
    for (const section of group.sections) {
      for (const item of section.items) {
        sub[item.control] = [map[item.type]];
      }
    }
    root[group.group] = fb.group(sub);
  }
  return fb.group(root);
}

export default class Nitrogen {
  spacing = {
    pt: 5,
    pr: 5,
    pb: 5,
    pl: 5,
    mt: 10,
    mr: 10,
    mb: 10,
    ml: 10,
  };
  borders = {
    width: 1,
    color: 'gray',
    tl: 5,
    tr: 5,
    br: 5,
    bl: 5,
  };
  header = {
    display: true,
    title: '',
    color: '#FF0000',
    backgroundColor: '#FFFFFF',
    transparent: true,
  };
  icons = {
    display: true,
    radius: 50,
    icons: [
      {
        display: true,
        backgroundColor: '#FF5D5B',
        id: 'a',
      },
      {
        display: true,
        backgroundColor: '#FFBB39',
        id: 'b',
      },
      {
        display: true,
        backgroundColor: '#00CD4E',
        id: 'c'
      },
    ] as NitIcon[]
  };
  layout = {
    backgroundColor: '#FFFFFF',
    transparent: false
  };
  code = {
    theme: 'github',
    language: 'javascript',
  };
  export = {
    sizing: 2,
    render: RenderOutput.PNG,
  };
}

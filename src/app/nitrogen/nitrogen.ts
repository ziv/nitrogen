import { FormBuilder } from '@angular/forms';
import { from } from 'rxjs';

export enum RenderOutput {
  PNG,
  SVG
}

export function nitroDef() {
  return from(import('../../data/nitrogen-forms').then(m => m.default));
}

export type Model = Record<string, Record<string, Record<string, string | number | unknown[]>>>;

export function nitroForm(fb: FormBuilder, m: Model) {
  const form: Record<string, unknown> = {};
  for (const g in m) {
    const group: Record<string, unknown> = {};
    for (const key in m[g]) {
      group[key] = Array.isArray(m[g][key]) ? [[]] : [m[g][key]];
    }
    form[g] = fb.group(group);
  }
  return fb.group(form);
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
    display: false,
    title: '',
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
    ]
  };
  layout = {
    backgroundColor: '#FFFFFF',
    transparent: false,
    displayHeader: true,
    displayTitle: false,
    title: '',
    displayIcons: true,
  };
  code = {
    theme: 'github',
    language: 'javascript',
  };
  export = {
    sizing: 2,
    render: RenderOutput.PNG,
  };
    // code
    // theme = 'github';
    // language = 'javascript';

  // workspace
  // backgroundColor = '#FFFFFF';
  // transparent = false;

  // dropShadow = false;
  // shadowX = 5;
  // shadowY = 5;
  // shadowBlur = 5;
  // shadowColor = '#000000';

  // marginTop = 10;
  // marginBottom = 10;
  // marginLeft = 10;
  // marginRight = 10;

  // workspace, window
  // borderColor = 'grey';
  // borderWidth = 1;
  // tl = 5;
  // tr = 5;
  // br = 5;
  // bl = 5;

  // workspace, window, header
  // displayHeader = true;
  // headerHeight = 1.5; // todo em, convert to pixels?
  // displayIcons = true;
  // displayTitle = false;
  // title = '';

  // titleSize = .8 // todo em, convert to pixels?
  // titleColor = 'grey';

  // workspace, window, code
  // top = 10;
  // bottom = 10;
  // left = 10;
  // right = 10;

  // workspace, export
  // sizing = 2;
  // render = 'png';

  // preview: HTMLImageElement | null = null;
}

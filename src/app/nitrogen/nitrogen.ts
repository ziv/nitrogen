import { FormBuilder } from '@angular/forms';
import { from } from 'rxjs';

export enum RenderOutput {
  PNG,
  SVG
}

export function nitroDef() {
  return from(import('../../data/nitrogen-forms').then(m => m.default));
}

export function nitroForm(fb: FormBuilder) {
  const group = (el: any) => {
    const form = {} as any;
    for (const key of Object.keys(el)) {
      form[key] = typeof el[key] === 'object' ? group(el[key]) : el[key];
    }
    return fb.group(form);
  }
  return group(new Nitrogen());
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
  layout = {
    backgroundColor: '#FFFFFF',
    transparent: false,
    displayIcons: true,
    displayHeader: true,
    displayTitle: false,
    title: '',
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

  dropShadow = false;
  shadowX = 5;
  shadowY = 5;
  shadowBlur = 5;
  shadowColor = '#000000';

  // marginTop = 10;
  // marginBottom = 10;
  // marginLeft = 10;
  // marginRight = 10;

  // workspace, window
  borderColor = 'grey';
  borderWidth = 1;
  // tl = 5;
  // tr = 5;
  // br = 5;
  // bl = 5;

  // workspace, window, header
  // displayHeader = true;
  headerHeight = 1.5; // todo em, convert to pixels?
  // displayIcons = true;
  // displayTitle = false;
  // title = '';

  titleSize = .8 // todo em, convert to pixels?
  titleColor = 'grey';

  // workspace, window, code
  // top = 10;
  bottom = 10;
  left = 10;
  right = 10;

  // workspace, export
  // sizing = 2;
  // render = 'png';

  // preview: HTMLImageElement | null = null;
}

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Nitrogen, { nitroDef, nitroForm } from './nitrogen';
import { FieldsetInput } from '../components/fieldset';
import { init } from './highlight';

@Injectable({providedIn: 'root'})
export class Nitro {
  definition?: FieldsetInput[];
  form?: FormGroup;

  get nitrogen(): Nitrogen {
    return this.form?.value ?? {};
  }

  constructor() {
    nitroDef().then(definition => {
      init();
      this.definition = definition;
      this.form = nitroForm(definition);
      this.form.setValue(new Nitrogen());
    });
  }

  highlight() {
    // this.assert();
    // this.component.el.removeAttribute('data-highlighted');
    // highlight(this.component?.el);
  }

  async download() {
    // this.assert();
    // const {sizing} = this.value.export;
    // const node = document.querySelector('.workspace') as HTMLElement;
    // const png = await toPng(node, {sizing});
    // const link = document.createElement('a');
    // link.download = 'nitrogen.png';
    // link.href = png;
    // document.body.appendChild(link);
    // link.click();
  }

  private assert() {
    // if (!this.component) {
    //   throw new Error('There is no code element to highlight. Make sure you put the <nit-code> element');
    // }
  }
}

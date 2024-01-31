import { inject, Injectable, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import type { Code } from '../components/code';
import { toSvg } from './imagify';
import Nitrogen from './nitrogen';
import highlight from './highlight';
import { from } from 'rxjs';

const highlightFunc = () => import('highlight.js/lib/core').then(m => m.default);

@Injectable({providedIn: 'root'})
export class Nitro {
  readonly form = inject(FormBuilder).group<Nitrogen>(new Nitrogen());
  readonly formDefinition =from(import('../../data/nitrogen-forms').then(m => m.default));
  readonly zone = inject(NgZone);
  code?: Code;

  get value() {
    return this.form.value as Nitrogen;
  }

  constructor() {
    highlight()
  }

  init(code: Code) {
    this.code = code;
    return this;
  }

  async highlight() {
    if (!this.code) {
      return console.error('There is no code element to highlight. Make sure you put the <nit-code> element');
    }
    // todo replace with "hljs.highlight"
    this.code.el.removeAttribute('data-highlighted');
    const func = await highlightFunc();
    func.highlightElement(this.code?.el);
  }

  download() {
    const {sizing} = this.value;
    const node = document.querySelector('.workspace') as HTMLElement;
    const svg = toSvg(node, {
      width: node.offsetWidth,
      height: node.offsetHeight,
      size: sizing,
    });
    const img = new Image();
    img.src = svg;
    this.form.patchValue({preview: img});
  }
}
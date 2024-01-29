import { inject, Injectable, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import type { Code } from '../components/code';
import { toSvg } from './imagify';
import Model from './model';


@Injectable({providedIn: 'root'})
export class Nitro {
  readonly form = inject(FormBuilder).group<Model>(new Model());
  readonly zone = inject(NgZone);
  code?: Code;

  get value() {
    return this.form.value as Model;
  }

  constructor() {
    hljs.configure({ignoreUnescapedHTML: true})
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
  }

  init(code: Code) {
    this.code = code;
    return this;
  }

  highlight() {
    if (!this.code) {
      return console.error('There is no code element to highlight. Make sure you put the <nit-code> element');
    }
    this.code.el.removeAttribute('data-highlighted');
    // todo replace with "hljs.highlight"
    hljs.highlightElement(this.code.el);
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

import { inject, Injectable, Input, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import type { Code } from './components/code';
import domtoimage from 'dom-to-image';
import { toSvg } from './imagify';

export interface Language {
  name: string;
  mode: string;
  short?: string;
  mime?: string;
  custom?: boolean;
  highlight?: boolean;
}

export interface CodeStyle {
  language: string;
  theme: string;
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface WindowStyle {
  displayHeader: boolean;
  displayIcons: boolean;
  displayTitle: boolean;
  title: string;
  displayFooter: boolean;
  footer: string;
}

export class Nitrogen implements CodeStyle, WindowStyle {
  // window style
  displayHeader = true;
  displayIcons = true;
  displayTitle = false;
  title = '';
  displayFooter = false;
  footer = '';
  backgroundColor = '#FFFFFF';
  transparent = false;

  // border radius
  tl = 5;
  tr = 5;
  br = 5;
  bl = 5;

  // CodeStyle
  language = 'typescript';
  theme = 'github'; // 'github';
  top = 10;
  bottom = 10;
  left = 10;
  right = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;

  // rendering
  sizing = 2;
  render = 'png';

  preview: HTMLImageElement | null = null;
}

@Injectable({providedIn: 'root'})
export class Nitro {
  readonly form = inject(FormBuilder).group<Nitrogen>(new Nitrogen());
  readonly zone = inject(NgZone);
  code?: Code;

  @Input() languagePath = '/assets/languages.json'
  @Input() themePath = '/assets/themes.json'

  languages: string[] = [];
  themes: string[] = [];

  get value() {
    return this.form.value as Nitrogen;
  }

  constructor() {
    import('../data/languages').then(m => this.languages = m.default);
    import('../data/themes').then(m => this.themes = m.default);
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
    hljs.highlightElement(this.code.el);
  }

  download() {
    const {sizing, transparent, backgroundColor} = this.value;
    const node = document.querySelector('.workspace') as HTMLElement;
    const conf = {
      style: {
        transform: `scale(${sizing})`,
        'transform-origin': '0 0',
        background: transparent ? 'none': backgroundColor,
      },
      width: node.offsetWidth * sizing,
      height: node.offsetHeight * sizing,
    }
    const svg = toSvg(node, conf);
    const img = new Image();
    img.src = svg;
    this.form.patchValue({
      preview: img
    });
  }
}

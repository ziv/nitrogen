import { Component, ElementRef, inject } from '@angular/core';
import { Nitro } from '../nitrogen';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nit-code',
  standalone: true,
  imports: [NgClass],
  template: `
    <pre [style]="preStyle"
         [ngClass]="themeClass"><code [style]="codeStyle"
            [ngClass]="langClass"
            (keydown.tab)="tab($event)"
            contenteditable="true"
      >// paste your code here</code></pre>
  `,
  styles: `

pre, code {
  margin: 0;
  padding: 0;
}

pre {
  display: flex;
  overflow: hidden;
}

code, code:focus {
  outline: 0;
  height: 100%;
  width: 100%;
  color: grey;
  padding: 0;
}
  `
})
export class Code {
  protected readonly ref = inject(ElementRef);
  protected readonly nitro = inject(Nitro).init(this);

  get el() {
    return this.ref.nativeElement.querySelector('code')
  }

  get themeClass() {
    return this.nitro.value.theme ? `theme-${this.nitro.value.theme}` : '';
  }

  get langClass() {
    return this.nitro.value.language ? `language-${this.nitro.value.language}` : '';
  }

  get preStyle() {
    const {displayHeader, tr, tl, br, bl} = this.nitro.value;
    return {
      border: '2px solid grey',
      borderRadius: displayHeader ? `0 0 ${br}px ${bl}px` : `${tl}px ${tr}px ${br}px ${bl}px`,
      borderTop: displayHeader ? '0' : '1px solid grey',
    };
  }

  get codeStyle() {
    const {top, bottom, left, right} = this.nitro.value;
    return {
      padding: `${top}px ${right}px ${bottom}px ${left}px`,
    };
  }

  protected tab(e: Event) {
    e.preventDefault();
    const selection = getSelection() as Selection;
    const range = selection.getRangeAt(0);
    const tab = document.createTextNode('\u00a0\u00a0\u00a0\u00a0');
    range.insertNode(tab);
    range.setStartAfter(tab);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

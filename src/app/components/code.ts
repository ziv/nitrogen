import { Component, ElementRef, inject } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Nitro } from '../nitrogen/nitrogen';

@Component({
  selector: 'nit-code',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf],
  styles: [`
    :host {
      display: flex;
      //border-color: transparent;
    }

    div.workspace {
      display: flex;

      div.border {
        //border-radius: .5em .5em .5em .5em;

        header {
          height: 1.5em;
          display: flex;
          align-items: center;
          background-color: black;
          padding: .1em 1em .1em .4em;

          span {
            color: grey;
            font-size: .8em;
          }

          .close, .min, .max {
            width: .5em;
            height: .5em;
            border-radius: 50%;
            margin-right: .2em;
          }

          .close {
            background: #FF5D5B;
          }

          .min {
            background: #FFBB39;
          }

          .max {
            background: #00CD4E;
          }
        }

        main {
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
        }
      }
    }

  `],
  template: `
    <div class="workspace" [ngStyle]="workspace">
      <div class="border">
        <header *ngIf="nitro.value.displayHeader" [ngStyle]="headerStyle">
          <ng-container *ngIf="nitro.value.displayIcons">
            <div class="close"></div>
            <div class="min"></div>
            <div class="max"></div>
          </ng-container>
          <span *ngIf="nitro.value.displayTitle">{{ nitro.value.title }}</span>
        </header>
        <main [ngClass]="langClass">
          <pre [style]="preStyle"
               [ngClass]="themeClass"><code [style]="codeStyle"
                                            (keydown.tab)="tab($event)"
                                            contenteditable="true"
          >const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {{ '{' }}
            const go = (f, seed, acc) => {{ '{' }}
            const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
            {{ '}' }}
  </code></pre>
        </main>
      </div>
    </div>
  `,
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

  get headerStyle() {
    const {tr, tl} = this.nitro.value;
    return {
      borderRadius: `${tl}px ${tr}px 0 0`,
    };
  }

  get workspace() {
    const {backgroundColor, marginTop, marginRight, marginBottom, marginLeft, transparent} = this.nitro.value;
    return {
      backgroundColor: transparent ? 'transparent': backgroundColor,
      paddingTop: `${marginTop}px`,
      paddingRight: `${marginRight}px`,
      paddingBottom: `${marginBottom}px`,
      paddingLeft: `${marginLeft}px`,
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

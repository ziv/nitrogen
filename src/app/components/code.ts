import { Component, ElementRef, inject } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Nitro } from '../nitrogen/nitro';

@Component({
  selector: 'nit-code',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf],
  styles: [`
    :host {
      display: flex;
    }

    div.workspace {
      display: flex;

      div.border {

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
        <header *ngIf="layout.displayHeader" [ngStyle]="headerStyle">
          <ng-container *ngIf="layout.displayIcons">
            <div class="close"></div>
            <div class="min"></div>
            <div class="max"></div>
          </ng-container>
          <span *ngIf="layout.displayTitle">{{ layout.title }}</span>
        </header>
        <main [ngClass]="langClass">
          <pre [style]="preStyle"
               [ngClass]="themeClass"><code [style]="codeStyle"
                                            (keydown.tab)="tab($event)"
                                            contenteditable="true">const foo = [1, 2, 3];</code></pre>
        </main>
      </div>
    </div>
  `,
})
export class Code {
  protected readonly ref = inject(ElementRef);
  protected readonly nitro = inject(Nitro).init(this);

  get el(): HTMLElement {
    return this.ref.nativeElement.querySelector('code')
  }

  // accessors for groups data

  get code() {
    return this.nitro.value.code;
  }

  get borders() {
    return this.nitro.value.borders;
  }

  get layout() {
    return this.nitro.value.layout;
  }

  get spacing() {
    return this.nitro.value.spacing;
  }

  get exports() {
    return this.nitro.value.export;
  }

  // styles/classes helpers

  get themeClass() {
    return this.code.theme ? `theme-${this.code.theme}` : '';
  }

  get langClass() {
    return this.code.language ? `language-${this.code.language}` : '';
  }

  get preStyle() {
    const {br, bl, tl, tr, width, color} = this.borders;
    const {displayHeader} = this.layout;

    return {
      border: `${width}px solid ${color}`,
      borderRadius: displayHeader ? `0 0 ${br}px ${bl}px` : `${tl}px ${tr}px ${br}px ${bl}px`,
      borderTop: displayHeader ? '0' : '${width}px solid ${color}',
    };
  }

  get codeStyle() {
    const {pl, pr, pt, pb} = this.spacing;
    return {
      padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
    };
  }

  get headerStyle() {
    const {tr, tl} = this.borders;
    return {
      borderRadius: `${tl}px ${tr}px 0 0`,
    };
  }

  get workspace() {
    const {backgroundColor, transparent} = this.layout;
    const {ml, mr, mt, mb} = this.spacing;
    return {
      backgroundColor: transparent ? 'transparent' : backgroundColor,
      paddingTop: `${mt}px`,
      paddingRight: `${mr}px`,
      paddingBottom: `${mb}px`,
      paddingLeft: `${ml}px`,
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

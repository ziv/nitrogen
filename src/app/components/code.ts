import { Component, ElementRef, inject } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Nitro } from '../nitrogen/nitro';
import { highlight } from '../nitrogen/highlight';
import { NitIcon } from './icons-field';

@Component({
  selector: 'nit-code',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf],
  styles: [`
    :host {
      display: flex;
    }

    div.workspace {
      div.inner {
        header {
          height: 1.5em;
          background-color: black;
          padding: .1em 1em .1em .4em;

          span {
            color: grey;
            font-size: .8em;
          }

          .icon {
            width: .5em;
            height: .5em;
            border-radius: 50%;
            margin-right: .2em;
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
    <div class="workspace f" [ngStyle]="workspace">
      <div class="inner">
        @if (header.display) {
          <header class="f aic" [ngStyle]="headerStyle">
            @if (icons.display) {
              @for (icon of icons.icons; track icon.id) {
                <div class="icon" [ngStyle]="iconStyle(icon)"></div>
              }
            }
            @if (header.title) {
              <span [ngStyle]="titleStyle">{{ header.title }}</span>
            }
          </header>
        }
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
  protected readonly nitro = inject(Nitro); // .init(this);

  highlight() {
    const el = this.ref.nativeElement.querySelector('code');
    el.removeAttribute('data-highlighted');
    highlight(el);
  }


  get el(): HTMLElement {
    return this.ref.nativeElement.querySelector('code');
  }

  // accessors for groups data

  get header() {
    return this.nitro.nitrogen.header ?? {};
  }


  get icons() {
    return this.nitro.nitrogen.icons ?? {};
  }


  get code() {
    return this.nitro.nitrogen.code ?? {};
  }

  get borders() {
    return this.nitro.nitrogen.borders ?? {};
  }

  get layout() {
    return this.nitro.nitrogen.layout ?? {};
  }

  get spacing() {
    return this.nitro.nitrogen.spacing ?? {};
  }

  get exports() {
    return this.nitro.nitrogen.export ?? {};
  }

  // styles/classes helpers

  get themeClass() {
    return this.code.theme ? `theme-${this.code.theme}` : '';
  }

  get langClass() {
    return this.code.language ? `language-${this.code.language}` : '';
  }


  // ngStyles helpers
  iconStyle({backgroundColor, display}: NitIcon) {
    return {
      display: display ? 'block' : 'none',
      backgroundColor
    };
  }

  get titleStyle() {
    const {color} = this.header;
    return {
      color: color
    };
  }


  get preStyle() {
    const {br, bl, tl, tr, width, color} = this.borders ?? {};
    const displayHeader = true;

    return {
      border: `${width}px solid ${color}`,
      borderRadius: displayHeader ? `0 0 ${br}px ${bl}px` : `${tl}px ${tr}px ${br}px ${bl}px`,
      borderTop: displayHeader ? '0' : '${width}px solid ${color}',
    };
  }

  get codeStyle() {
    const {pl, pr, pt, pb} = this.spacing ?? {};
    return {
      padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
    };
  }

  get headerStyle() {
    const {backgroundColor, transparent} = this.header;
    const {tr, tl} = this.borders;
    return {
      borderRadius: `${tl}px ${tr}px 0 0`,
      backgroundColor: transparent ? 'transparent' : backgroundColor,
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

  /**
   * Keep the cursor in the editable area
   * @param e
   * @protected
   */
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

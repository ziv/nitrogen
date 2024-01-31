import { Component, inject } from '@angular/core';
import { Code } from '../components/code';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Nitro } from '../nitrogen/nitro';
import { ThemeEditor } from '../components/theme-editor';

@Component({
  standalone: true,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    div.fullscreen {
      height: 100%;

      section.toolbar {
        background-color: white;
        color: black;
        height: 3em;
        display: flex;
        align-items: center;
      }

      section.content {
        background-color: black;
        display: flex;
        height: calc(100vh - 3em);

        aside {
          background-color: purple;
          width: 400px;
          height: calc(100vh - 3em);
          overflow-y: scroll;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }
  `],
  template: `
    <div class="fullscreen">
      <section class="toolbar">
        <button (click)="settings=!settings">settings</button>
        <button (click)="nitro.highlight()">highlight</button>
        <button (click)="nitro.download()">export</button>
      </section>
      <section class="content">
        <main>
          <section>
            <nit-code />
          </section>
        </main>
        <aside *ngIf="settings">
          <div>
            <nit-theme-editor />
          </div>
        </aside>
      </section>
    </div>
  `,
  imports: [
    NgIf,
    RouterOutlet,
    Code,
    ThemeEditor,
  ]
})
export default class Main {
  protected readonly nitro = inject(Nitro);
  protected settings = true;
}

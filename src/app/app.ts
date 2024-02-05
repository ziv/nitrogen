import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Code } from './components/code';
import { Fields } from './components/fields';
import { ReactiveFormsModule } from '@angular/forms';
import { Nitro } from './nitrogen/nitro';

@Component({
  selector: 'nit-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, Code, Fields, NgIf, ReactiveFormsModule],
  styles: [`
    // todo colors/heights from vars
    :host {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    div {
      height: 100%;

      main header,
      aside header {
        background-color: var(--toolbar-background-color);
        color: var(--color-on-toobar);
        height: 3em;
        width: 100%;
      }

      main {
        background-color: var(--workspace-background-color);
      }

      aside {
        width: 400px;
        border-left: 1px solid gray;
      }
    }
  `],
  template: `
    <div class="f">
      <main class="f f1 fdc aic">
        <header class="f aic jcc">
          <button class="ico" (click)="settings=!settings">settings</button>
          <button (click)="nitro.highlight()">HIGHLIGHT</button>
          <button (click)="nitro.download()">EXPORT</button>
        </header>
        <section *ngIf="!settings">Common Editor</section>
        <article class="f f1 aic jcc">
          <nit-code/>
        </article>
      </main>
      <aside *ngIf="settings">
        <header class="f aic jcc">SETTINGS</header>
        <form [formGroup]="nitro.form">
          <nit-fields [form]="nitro.form" [fields]="nitro.formDefinition | async"/>
        </form>
      </aside>
    </div>
  `
})
export class App {
  protected readonly nitro = inject(Nitro);
  protected settings = true;
}

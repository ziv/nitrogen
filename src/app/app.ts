import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { Form } from './components/form';
import { Code } from './components/code';
import { Workspace } from './components/workspace';
import { Nitro } from './nitrogen';

@Component({
  selector: 'nit-root',
  standalone: true,
  imports: [CommonModule, Form, Code, Workspace, JsonPipe],
  template: `
    <div class="wrapper">
      <aside>
        <h1>Nitrogen</h1>
        <nit-form />
      </aside>
      <main>
        <h1>Preview</h1>
        <section>
          <nit-workspace>
            <nit-code/>
          </nit-workspace>
        </section>
        <pre>{{nitro.value | json}}</pre>
        <ng-container *ngIf="nitro.value.preview">
          <img [src]="nitro.value.preview.src" alt="preview" />
        </ng-container>
      </main>
    </div>
  `,
  styles: `

div.wrapper {
  display: flex;
}

div.wrapper aside {
  padding: 1em;
  width: 400px;
}

div.wrapper main {
  padding-top: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
}
`,
})
export class App {
  readonly nitro = inject(Nitro);

  toSvg() {

  }
}

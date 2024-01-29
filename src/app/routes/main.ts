import { Component, inject } from '@angular/core';
import { Workspace } from '../components/workspace';
import { Code } from '../components/code';
import { Nitro } from '../nitrogen';
import { JsonPipe, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdvancedForm } from '../components/advanced-form';

/**
 *     :host {
 *       display: flex;
 *
 *       aside {
 *         width: 400px;
 *       }
 *
 *       main {
 *         flex: 1;
 *         display: flex;
 *         flex-direction: column;
 *       }
 *     }
 */
@Component({
  standalone: true,
  styles: [`
    :host {
      display: flex;


      aside {
        width: 400px;
      }


      main {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

    }
  `],
  template: `
    <aside>
      <h1>Settings</h1>
      <nit-advanced-form></nit-advanced-form>
    </aside>
    <main>
      <h1>Preview</h1>
      <section>
        <nit-workspace>
          <nit-code/>
        </nit-workspace>
      </section>
    </main>
  `,
  imports: [
    Workspace,
    Code,
    JsonPipe,
    NgIf,
    RouterOutlet,
    AdvancedForm,
  ]
})
export default class Main {
  readonly nitro = inject(Nitro);
}

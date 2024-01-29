import { Component } from '@angular/core';
import { Code } from '../components/code';
import { RouterOutlet } from '@angular/router';
import { AdvancedForm } from '../components/advanced-form';

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
          <nit-code/>
      </section>
    </main>
  `,
  imports: [
    Code,
    RouterOutlet,
    AdvancedForm,
  ]
})
export default class Main {
}

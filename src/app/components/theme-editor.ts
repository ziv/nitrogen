import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Nitro } from '../nitrogen/nitro';
import { Fieldset } from './fieldset';
import { Fields } from './fields';

@Component({
  selector: 'nit-theme-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    Fieldset,
    Fields,
    AsyncPipe,
  ],
  template: `
    <form [formGroup]="nitro.form">
      <nit-fields [form]="nitro.form" [fields]="nitro.formDefinition | async" />
    </form>`
})
export class ThemeEditor {
  protected readonly nitro: Nitro = inject(Nitro);
}

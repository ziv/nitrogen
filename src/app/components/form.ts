import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Nitro } from '../nitrogen';
import { Layout } from './forms/layout';
import { Spacing } from './forms/spacing';
import { Highlight } from './forms/highlight';
import { Border } from './forms/border';
import { Export } from './forms/export';

@Component({
  selector: 'nit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Layout,
    Spacing,
    Highlight,
    Border,
    Export,
  ],
  template: `
    <form [formGroup]="nitro.form">
      <nit-form-highlight/>
      <nit-form-layout/>
      <nit-form-spacing/>
      <nit-form-border />
      <nit-form-export />
    </form>
  `
})
export class Form {
  protected readonly nitro = inject(Nitro);
}

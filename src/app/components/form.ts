import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Nitro } from '../nitrogen/nitrogen';
import { Highlight } from './forms/highlight';
import { Export } from './forms/export';
import { NgIf } from '@angular/common';

@Component({
  selector: 'nit-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    Highlight,
    Export,
  ],
  template: `
    <form [formGroup]="nitro.form">

    </form>
  `
})
export class Form {
  protected readonly nitro = inject(Nitro);
}

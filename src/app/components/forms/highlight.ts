import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Nitro } from '../../nitrogen';
import { NgFor } from '@angular/common';


@Component({
  selector: 'nit-form-highlight',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  template: `
    <fieldset [formGroup]="nitro.form">
      <button (click)="nitro.highlight()">HIGHLIGHT</button>
    </fieldset>
  `
})
export class Highlight {
  nitro = inject(Nitro);
}

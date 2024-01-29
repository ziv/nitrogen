import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Nitro } from '../../nitrogen/nitrogen';
import { NgFor } from '@angular/common';


@Component({
  selector: 'nit-form-export',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <fieldset [formGroup]="nitro.form">
      <legend>Export</legend>
      <label>
        <span>Sizing</span>
        <input type="range" min="1" max="4" step="1" formControlName="sizing">
        x{{ nitro.value.sizing }}
      </label>
      <p>
        <button (click)="nitro.download()">EXPORT</button>
      </p>
    </fieldset>
  `
})
export class Export {
  nitro = inject(Nitro);
}

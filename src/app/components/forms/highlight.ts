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
      <legend>Highlight</legend>
      <label>
        <span>Theme</span>
        <select formControlName="theme">
          <option *ngFor="let theme of nitro.themes" [ngValue]="theme">{{ theme }}</option>
        </select>
      </label>
      <label>
        <span>Language</span>
        <select formControlName="language">
          <option *ngFor="let lang of nitro.languages" [ngValue]="lang">{{ lang }}</option>
        </select>
      </label>
      <button (click)="nitro.highlight()">HIGHLIGHT</button>
    </fieldset>
  `
})
export class Highlight {
  nitro = inject(Nitro);
}

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Nitro } from '../../nitrogen';
import { NgFor } from '@angular/common';


@Component({
  selector: 'nit-form-border',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  template: `
    <fieldset [formGroup]="nitro.form">
      <legend>Border</legend>
      <h3>Radius</h3>
      <label><span>Top Left</span><input type="range" min="0" max="100" formControlName="tl"><span class="postfix">px</span></label>
      <label><span>Top Right</span><input type="range" min="0" max="100" formControlName="tr"><span class="postfix">px</span></label>
      <label><span>Bottom Right</span><input type="range" min="0" max="100" formControlName="br"><span class="postfix">px</span></label>
      <label><span>Bottom Left</span><input type="range" min="0" max="100" formControlName="bl"><span class="postfix">px</span></label>
    </fieldset>
  `
})
export class Border {
  nitro = inject(Nitro);
}

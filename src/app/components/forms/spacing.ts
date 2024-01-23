import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Nitro } from '../../nitrogen';


@Component({
  selector: 'nit-form-spacing',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <fieldset [formGroup]="nitro.form">
      <legend>Spacing</legend>
      <h3>Internal</h3>
      <label><span>Top</span><input type="range" min="0" max="100" formControlName="top"><span class="postfix">px</span></label>
      <label><span>Right</span><input type="range" min="0" max="100" formControlName="right"><span class="postfix">px</span></label>
      <label><span>Bottom</span><input type="range" min="0" max="100" formControlName="bottom"><span class="postfix">px</span></label>
      <label><span>Left</span><input type="range" min="0" max="100" formControlName="left"><span class="postfix">px</span></label>
      <h3>External</h3>
      <label><span>Top</span><input type="range" min="0" max="100" formControlName="marginTop"><span class="postfix">px</span></label>
      <label><span>Right</span><input type="range" min="0" max="100" formControlName="marginRight"><span class="postfix">px</span></label>
      <label><span>Bottom</span><input type="range" min="0" max="100" formControlName="marginBottom"><span class="postfix">px</span></label>
      <label><span>Left</span><input type="range" min="0" max="100" formControlName="marginLeft"><span class="postfix">px</span></label>
    </fieldset>
  `
})
export class Spacing {
  nitro = inject(Nitro);
}

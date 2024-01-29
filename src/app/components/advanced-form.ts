import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Nitro } from '../nitrogen/nitrogen';
import { Highlight } from './forms/highlight';
import { Export } from './forms/export';
import { Fieldset, FieldsetInput } from './fieldset';
import { getFormBorders, getFormHighlights, getFormLayouts, getFormSpaces } from '../../data/loaders';

@Component({
  selector: 'nit-advanced-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Highlight,
    Export,
    Fieldset,
  ],
  template: `
    <form [formGroup]="form">
      <nit-form-highlight/>
      <nit-fieldset [form]="form" [value]="highlights"></nit-fieldset>
      <nit-fieldset [form]="form" [value]="layout"></nit-fieldset>
      <nit-fieldset [form]="form" [value]="borders"></nit-fieldset>
      <nit-fieldset [form]="form" [value]="spaces"></nit-fieldset>
      <nit-form-export/>
    </form>
  `
})
export class AdvancedForm {
  protected readonly form: FormGroup = inject(Nitro).form;
  protected layout?: FieldsetInput;
  protected borders?: FieldsetInput;
  protected spaces?: FieldsetInput;
  protected highlights?: FieldsetInput;

  constructor() {
    getFormLayouts().then(items => this.layout = items);
    getFormSpaces().then(items => this.spaces = items);
    getFormBorders().then(items => this.borders = items);
    getFormHighlights().then(items => {
      this.highlights = items;
      console.log(this.highlights);
    });
  }
}

import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

export enum FieldsetTypes {
  Range = 'range',
  Checkbox = 'checkbox',
  Color = 'color',
  Text = 'text',
  Select = 'select'
}

export interface FieldsetItem {
  type: FieldsetTypes;
  label: string;
  control: string;
  props: Record<string, string | number>;
  condition?: (value: any) => boolean;
  options?: any[]
  optionsTrack?: any;
}

export interface FieldsetSection {
  label?: string;
  items: FieldsetItem[];
}

export interface FieldsetInput {
  legend: string;
  sections: FieldsetSection[];
}

@Component({
  selector: 'nit-fieldset',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  template: `
    @if (form && value) {
      <fieldset [formGroup]="form">
        <legend>{{ value.legend }}</legend>
        @for (section of value.sections; track section.label) {
          @if (section.label) {
            <h3>{{ section.label }}</h3>
          }
          @for (item of section.items; track item.control) {
            @if (displayItem(item)) {
              <label>
                @if (isCheckbox(item)) {
                  <!-- todo open an Angular issue: using checkbox with dynamic input type error -->
                  <input type="checkbox" [formControlName]="item.control">
                  <span class="post">{{ item.label }}</span>
                } @else if (isRange(item)) {
                  <span class="pre">{{ item.label }}</span>
                  <input [type]="item.type" [formControlName]="item.control"
                         [max]="item.props['max']" [min]="item.props['min']">
                } @else if (isColor(item)) {
                  <input [type]="item.type" [formControlName]="item.control">
                  <span class="post">{{ item.label }}</span>
                } @else if (isText(item)) {
                  <span class="pre">{{ item.label }}</span>
                  <input [type]="item.type" [formControlName]="item.control">
                } @else if (isSelect(item)) {
                  <span class="pre">{{ item.label }}</span>
                  <select [formControlName]="item.control">
                    @for (el of item.options; track el.label) {
                      <!-- todo create label for each el -->
                      <option [ngValue]="el.value">{{ el.label }}</option>
                    }
                  </select>
                }
              </label>
            }
          }
        }
      </fieldset>
    }
  `
})
export class Fieldset {
  @Input() form?: FormGroup;
  @Input() value?: FieldsetInput;

  displayItem(item: FieldsetItem) {
    return item.condition ? item.condition(this.form?.value) : true;
  }

  isRange(item: FieldsetItem) {
    return item.type === FieldsetTypes.Range;
  }

  isCheckbox(item: FieldsetItem) {
    return item.type === FieldsetTypes.Checkbox;
  }

  isColor(item: FieldsetItem) {
    return item.type === FieldsetTypes.Color;
  }

  isText(item: FieldsetItem) {
    return item.type === FieldsetTypes.Text;
  }

  isSelect(item: FieldsetItem) {
    return item.type === FieldsetTypes.Select;
  }
}

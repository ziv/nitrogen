import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

export enum FieldsetTypes {
  Range = 'range',
  Checkbox = 'checkbox',
  Color = 'color',
  Text = 'text',
  Select = 'select'
}

export interface FieldsetItemOptions {
  value: any;
  label: string;
}

export interface FieldsetItem {
  type: FieldsetTypes;
  label: string;
  control: string;
  props: Record<string, string | number>;
  condition?: (value: any) => boolean;
  options?: FieldsetItemOptions[]
  optionsTrack?: any;
}

export interface FieldsetSection {
  label?: string;
  items: FieldsetItem[];
}

export interface FieldsetInput {
  legend: string;
  sections: FieldsetSection[];
  group: string;
}

@Component({
  selector: 'nit-fieldset',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  styles: [`
    fieldset {
      border: 0;
      padding: 0;
      margin: 0;

      legend, h3, label {
        font-size: 1em;
        font-family: monospace;
      }

      legend {
        background-color: black;
        width: 100%;
        cursor: pointer;
        padding: .5em;
        margin: 0;
        display: block;
      }

      h3 {
        font-weight: normal;
        padding: .4em 0;
        margin: 0;
      }

      label {
        span.pre {
          width: 10em;
          padding-inline-start: .5em;
        }

        span.post {
          padding-inline-start: .5em;
        }

        input[type="text"] {
          width: 13em;
        }

        select {
          width: 13.5em;
        }
      }
    }
  `],
  template: `
    @if (form && def) {
      <fieldset [formGroup]="form">
        <legend (click)="expand=!expand;changed.emit()">{{ def.legend }}</legend>
        @if (expand) {
          @for (section of def.sections; track section.label) {
            @if (section.label) {
              <h3>{{ section.label }}</h3>
            }
            @for (item of section.items; track item.control) {
              @if (displayItem(item)) {
                <label class="f aic">
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
                        <option [ngValue]="el.value">{{ el.label }}</option>
                      }
                    </select>
                  }
                </label>
              }
            }
          }
        }
      </fieldset>
    }
  `
})
export class Fieldset {
  expand = false;
  @Input() form?: FormGroup;
  @Input() def?: FieldsetInput | null;

  @Output() changed = new EventEmitter<void>();

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

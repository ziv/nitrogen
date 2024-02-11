import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/*

+-----------+------+
| aligning  | size |
+-----------+------+
| fonts            |
+-----------+------+

 */

export interface FontFieldInput {
  font: string;
  color: string;
  weight: string;
  align: string;
  size: number;
}

@Component({
  selector: 'nit-font-field',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FontField,
    }
  ],
  template: ''
})
export class FontField {
  @Input() font?: FontFieldInput;
  @Input() fonts = ['a', 'b', 'c'];
  weights = ['lite', 'normal', 'bold'];
}

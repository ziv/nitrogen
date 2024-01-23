import { Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';

export interface Length {
  value: number;
  unit: string;
}

@Component({
  selector: 'nit-length',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CssLength,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CssLength,
    }
  ],
  template: `
    <div [formGroup]="form">
      <input formControlName="value" (blur)="onTouched()">
      <select formControlName="unit" (blur)="onTouched()">
        <option>px</option>
        <option>em</option>
      </select>
    </div>
  `,
  styles: '',
})
export class CssLength implements ControlValueAccessor, Validator, OnDestroy {
  sub = new Subscription();
  form = inject(FormBuilder).group({
    value: 0,
    unit: 'px'
  });

  onTouched = () => null;
  touched = false;

  writeValue(len: Length) {
    if (len) {
      this.form.setValue(len, {emitEvent: false});
    }
  }

  registerOnChange(onChange: any) {
    this.sub.add(this.form.valueChanges.subscribe(onChange));
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled)
      this.form.disable();
    else
      this.form.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    // todo complete validation
    if (this.form.valid)
      return null;
    return [];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

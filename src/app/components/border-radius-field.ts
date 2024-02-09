import { Component, inject } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

// todo implement view

@Component({
    selector: 'nit-radius-field',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: BorderRadiusField,
        }
    ],
    template: `
    <section>
      <input type="number" class="tl" (change)="update($event, 'tl')">
      <input type="number" class="tr" (change)="update($event, 'tr')">
      <input type="number" class="br" (change)="update($event, 'br')">
      <input type="number" class="bl" (change)="update($event, 'bl')">
    </section>
  `
})
export class BorderRadiusField implements ControlValueAccessor {
    form = inject(FormBuilder).group({tl: 0, tr: 0, br: 0, bl: 0});
    onChange = () => {
    };
    onTouched = () => {
    };

    disabled = false;
    touched = false;

    update(e: Event, id: string) {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
        // todo implement me
        console.log(e, id, typeof this.form);
    }

    registerOnChange(fn: () => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    writeValue(value: object): void {
        console.log(value);
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }
}

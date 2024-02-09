import { AfterViewInit, Component, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { filter, map, merge, Subscription, switchMap } from 'rxjs';
import { Fieldset, FieldsetInput } from './fieldset';

@Component({
    selector: 'nit-fields',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, NgFor, Fieldset],
    template: `
    @if (form && fields && fields.length) {
      @for (def of fields; track def.group) {
        <nit-fieldset [form]="group(def)" [def]="def"></nit-fieldset>
      }
    }`
})
export class Fields implements AfterViewInit, OnDestroy {
    private sub?: Subscription;
  @ViewChildren(Fieldset) private fs!: QueryList<Fieldset>;

  @Input() form!: FormGroup;
  @Input() fields: FieldsetInput[] | null = null;
  @Input() autoClose = true;

  group(def: FieldsetInput) {
      return this.form.get(def.group) as FormGroup;
  }

  ngAfterViewInit() {
      if (!this.autoClose) {
          return;
      }
      this.sub?.unsubscribe();

      const switchTo = () => merge(...this.fs.map((field: Fieldset) => field.changed.pipe(
          map(() => field),
          filter(field => field.expand),
      )));
      this.sub = this.fs.changes.pipe(switchMap(switchTo)).subscribe(field => {
          for (const f of this.fs) {
              if (f != field) f.expand = false;
          }
      });
  }

  ngOnDestroy() {
      this.sub?.unsubscribe();
  }
}

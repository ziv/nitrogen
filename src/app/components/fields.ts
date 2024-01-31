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
      @for (def of fields; track def.legend) {
        <nit-fieldset [form]="form" [def]="def"></nit-fieldset>
      }
    }`
})
export class Fields implements AfterViewInit, OnDestroy {
  private sub?: Subscription;
  @ViewChildren(Fieldset) private _fs!: QueryList<Fieldset>;

  @Input() form?: FormGroup;
  @Input() fields: FieldsetInput[] | null = null;
  @Input() autoClose = true;

  ngAfterViewInit() {
    if (!this.autoClose) {
      return;
    }
    this.sub?.unsubscribe();

    const switchTo = () => merge(...this._fs.map((field: Fieldset) => field.changed.pipe(
      map(() => field),
      filter(field => field.expand),
    )));
    this.sub = this._fs.changes.pipe(switchMap(switchTo)).subscribe(field => {
      for (const f of this._fs) {
        if (f != field) f.expand = false;
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

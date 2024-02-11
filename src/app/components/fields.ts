import { AfterViewInit, Component, inject, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter, merge, Subscription, switchMap } from 'rxjs';
import { Fieldset, FieldsetInput } from './fieldset';
import { Nitro } from '../nitrogen/nitro';

@Component({
  selector: 'nit-fields',
  standalone: true,
  imports: [ReactiveFormsModule, Fieldset],
  template: `
    @if (nitro.form && nitro.definition) {
      <form [formGroup]="nitro.form">
        @for (def of nitro.definition; track def.group) {
          <nit-fieldset [form]="group(def)" [def]="def"></nit-fieldset>
        }
      </form>
    }`
})
export class Fields implements AfterViewInit, OnDestroy {
  protected nitro = inject(Nitro);
  protected sub?: Subscription;
  @ViewChildren(Fieldset) protected fieldSets!: QueryList<Fieldset>;

  @Input() autoClose = true;

  group(def: FieldsetInput) {
    return (this.nitro.form as FormGroup).get(def.group) as FormGroup;
  }

  ngAfterViewInit() {
    if (!this.autoClose) {
      return;
    }
    this.sub?.unsubscribe();
    this.sub = this.fieldSets.changes.pipe(
      // let us know when the query done "querying" and contain a real list
      filter((ql: QueryList<Fieldset>) => ql.length !== 0),
      // take the list and create a new chain listening all `Fieldset.changed` events
      switchMap((ql) => merge(...ql.map(f => f.changed))),
      // then iterate all except the accepted one and close them
    ).subscribe(field => {
      for (const f of this.fieldSets) {
        if (f != field) f.close();
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

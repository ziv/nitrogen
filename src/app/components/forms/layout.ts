import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Nitro } from '../../nitrogen';
import { NgIf } from '@angular/common';


@Component({
  selector: 'nit-form-layout',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <fieldset [formGroup]="nitro.form">
      <legend>Layout</legend>
      <label><input type="color" formControlName="backgroundColor"><span>Background Color</span></label>
      <label><input type="checkbox" formControlName="transparent"><span>Transparent Background</span></label>
      <label><input type="checkbox" formControlName="displayIcons"><span>Display Icons</span></label>
      <label><input type="checkbox" formControlName="displayHeader"><span>Display Header</span></label>
      <ng-container *ngIf="nitro.value.displayHeader">
        <label><input type="checkbox" formControlName="displayTitle"><span>Display Title</span></label>
        <label *ngIf="nitro.value.displayTitle"><span>Title</span><input type="text" formControlName="title"></label>
      </ng-container>
    </fieldset>
  `
})
export class Layout {
  nitro = inject(Nitro);
}

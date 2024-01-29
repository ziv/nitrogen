import { Component } from '@angular/core';
import { AdvancedForm } from '../components/advanced-form';

@Component({
  standalone: true,
  template: `<h1>Nitrogen</h1>
  <nit-advanced-form/>`,
  imports: [AdvancedForm]
})
export default class Aside {
}

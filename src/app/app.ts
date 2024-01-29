import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'nit-root',
  standalone: true,
  imports: [RouterOutlet],
  styles: [`

  `],
  template: '<router-outlet />',
})
export class App {
}

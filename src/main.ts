import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, type Routes } from '@angular/router';
import { App } from './app/app';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app/routes/main'),
  },
  {
    path: 'about',
    loadComponent: () => import('./app/routes/about')
  }
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
}).catch((err) => console.error(err));

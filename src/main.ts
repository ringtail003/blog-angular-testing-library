import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { Routes, provideRouter } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadComponent: () => import("./app/features/heros1/heros1.component").then(module => module.Heros1Component)
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ],
})
.catch(err => console.error(err));

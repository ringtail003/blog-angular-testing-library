import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { Routes, provideRouter } from '@angular/router';

const routes: Routes = [
  {
    path: '/users',
    component: () => import('./featres/users/users.component.ts').then(module => module.UsersComponent)
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ],
})
.catch(err => console.error(err));

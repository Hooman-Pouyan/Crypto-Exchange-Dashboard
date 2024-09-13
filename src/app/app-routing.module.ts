import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {isAuthenticatedGuard} from './core/Guards/is-authenticated.guard';

const routes: Routes = [
  {path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
  {
    path: 'Login',
    loadChildren: () =>
      import('./public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'Dashboard',
    data: {title: 'داشبورد'},
    loadChildren: () =>
      import('./private/private.module').then(m => m.PrivateModule),
    canActivate: [isAuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardContainerComponent} from './dashboard-container/dashboard-container.component';
import {isAuthenticatedGuard} from 'src/app/core/Guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () => import("./dashboard-info/dashboard-info.module").then(m => m.DashboardInfoModule),
        data: {animation: 'routeAnimations'}
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then(m => m.UsersModule),
        data: {title: 'users'},
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../reports/reports.module').then(m => m.ReportsModule),
        data: {title: 'Reports'}
      },
      {
        path: 'exchange',
        loadChildren: () =>
          import('../exchange/exchange.module').then(m => m.ExhchangeModule),
        data: {title: 'Basic Information'}
      },
      {
        path: 'support',
        loadChildren: () =>
          import('../support/support.module').then(m => m.SupportModule),
        data: {title: 'Support'},
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('../software/software.module').then(m => m.SoftwareModule),
        data: {title: 'software'},
      },
      {
        path: 'faq',
        loadChildren: () =>
          import('../faq/faq.module').then(m => m.FaqModule),
        data: {title: 'faq'},
      },
      {
        path: 'club',
        loadChildren: () =>
          import('../Club/Club.module').then(m => m.clubModule),
        data: {title: 'user levels'},
      },
      {
        path: 'priceReference',
        loadChildren: () =>
          import('../price-refrence/price-refrence.module').then(m => m.PriceRefrenceModule),
        data: {title: 'price-Reference'},
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then(m => m.SettingsModule),
        data: {title: 'settings'},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}

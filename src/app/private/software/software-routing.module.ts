import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SoftwareContainerComponent} from "./software-container/software-container.component";

const routes: Routes = [
  {path: '', component: SoftwareContainerComponent},
  {
    path: 'versions',
    loadChildren: () => import('./version/version.module').then(m => m.VersionModule),
    data: {title:'versions'}
  },
  {
    path: 'translations',
    loadChildren: () => import('./translations/translations.module').then(m => m.TranslationsModule),
    data: {title:'translations'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule {
}

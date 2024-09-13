import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TranslateContainerComponent} from "./translate-container/translate-container.component";

const routes: Routes = [
  {
    path: ':id', component: TranslateContainerComponent,
    data:{title:'translate management'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationsRoutingModule { }

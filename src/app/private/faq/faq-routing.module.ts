import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FaqContainerComponent} from "./faq-container/faq-container.component";

const routes: Routes = [
  {path: '', component: FaqContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }

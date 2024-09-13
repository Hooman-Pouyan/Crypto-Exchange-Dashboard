import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqContainerComponent } from './faq-container/faq-container.component';


@NgModule({
  declarations: [
    FaqContainerComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule
  ]
})
export class FaqModule { }

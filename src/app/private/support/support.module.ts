import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportContainerComponent } from './support-container/support-container.component';

@NgModule({
  declarations: [
    SupportContainerComponent,
  ],
  imports: [
    CommonModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }

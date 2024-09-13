import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationContainerComponent } from './pagination-container/pagination-container.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    PaginationContainerComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule
  ],exports: [
    PaginationContainerComponent
  ]
})
export class PaginationModule { }

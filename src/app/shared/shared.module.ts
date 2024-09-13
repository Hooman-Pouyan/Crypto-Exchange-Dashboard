import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// @ts-ignore
// import { LoaderModule } from './Modules/loader/loader.module';
import { MaterialModule } from './modules/Material Modules/material.modules';
import { TranslateModule } from '@ngx-translate/core';
import { BreadCrumbModule } from './modules/breadcrumb/breadcrumb.module';
import { UndefinedPipe } from './Pipes/undefined.pipe';
@NgModule({
  declarations: [
    UndefinedPipe
  ],
  imports: [
    CommonModule,
    // LoaderModule,
    MaterialModule,
    TranslateModule,
    BreadCrumbModule
  ],
  exports: [
    MaterialModule,
    TranslateModule,
    BreadCrumbModule,
    UndefinedPipe
  ],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoaderContainerComponent } from './loader-container/loader-container.component';

@NgModule({
  declarations: [LoaderContainerComponent],
  imports: [CommonModule, NgxUiLoaderModule],
  exports: [LoaderContainerComponent],
})
export class LoaderModule {}

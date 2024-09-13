import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_SELECT_SCROLL_STRATEGY, MatSelectModule } from '@angular/material/select';

// export function scrollFactory(overlay: Overlay): () => OverlayScrollStrategy {
//   return () => overlay.scrollStrategies.block();
// }

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule,MatDialogModule,MatSelectModule],
  providers: [
    // Provide custom scroll strategy if needed
    // { provide: MAT_SELECT_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] },
  ],


})
export class CoreModule {}

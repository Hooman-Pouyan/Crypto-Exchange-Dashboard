import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidemenuContainerComponent } from './sidemenu-container/sidemenu-container.component';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MiniSidemenuComponent } from './mini-sidemenu/mini-sidemenu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [SidemenuContainerComponent, MiniSidemenuComponent, LogoComponent],
  exports: [SidemenuContainerComponent, MiniSidemenuComponent],
  imports: [CommonModule, ButtonModule, PanelMenuModule, SidebarModule,
    SharedModule,
    DividerModule,
    BadgeModule
  ],
})
export class SidemenuModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardContainerComponent} from './dashboard-container/dashboard-container.component';
import {SharedModule} from '../../shared/shared.module';
import {LayoutModule} from 'src/app/shared/modules/Layout/layout.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {SideMenuOverToggleDirective} from 'src/app/shared/Directives/side-menu-over-toggle.directive';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FormsModule} from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
@NgModule({
  declarations: [DashboardContainerComponent, SideMenuOverToggleDirective],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, LayoutModule,MatSlideToggleModule, InputSwitchModule, FormsModule,NgxPermissionsModule.forChild()],
  exports: [SharedModule]
})
export class DashboardModule {}

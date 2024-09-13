import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContainerComponent } from './header-container/header-container.component';
import { MenubarModule } from 'primeng/menubar';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {SplitButtonModule} from "primeng/splitbutton";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [HeaderContainerComponent],
    imports: [CommonModule, MenubarModule, ToolbarModule, ButtonModule, SplitButtonModule, MatProgressBarModule],
  exports: [HeaderContainerComponent],
})
export class HeaderModule {}

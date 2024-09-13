import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/Authentication/auth.service';
import { MenuService } from 'src/app/core/Services/Shared Services/menu.service';
import { BaseMenu } from '../base-menu';

@Component({
  selector: 'app-sidemenu-container',
  templateUrl: './sidemenu-container.component.html',
  styleUrls: ['./sidemenu-container.component.scss'],
})
export class SidemenuContainerComponent extends BaseMenu {



}

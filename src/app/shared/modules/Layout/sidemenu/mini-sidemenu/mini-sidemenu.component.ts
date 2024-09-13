import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { BaseMenu } from '../base-menu';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';

@Component({
  selector: 'app-mini-sidemenu',
  templateUrl: './mini-sidemenu.component.html',
  styleUrls: ['./mini-sidemenu.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniSidemenuComponent extends BaseMenu {


}

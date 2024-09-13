import {ChangeDetectionStrategy, Component, signal, ChangeDetectorRef, computed, OnInit, effect} from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { concatMap, from, map, tap } from 'rxjs';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import { RoleService } from 'src/app/core/Services/Feature Services/role.service';
import {SupportService} from 'src/app/core/Services/Feature Services/support.service';
import { ServiceConfigsService } from 'src/app/core/Services/Shared Services/ServiceConfigs.service';
import {MenuService} from 'src/app/core/Services/Shared Services/menu.service';

export enum Roles {
    'Owner',
    'Admin',
    'Operator'
}

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainerComponent implements OnInit {

  sideMenuOpen = computed(() => this.menuservice.sideMenuOpen());
  newNotifs = signal<any>(0)
  checked: boolean = true;

  permissions = signal<any>([])

  roleList: any = Roles;

  userRoles: any = []

  constructor(
    private menuservice: MenuService,
    private supportService: SupportService,
    private permissionService:NgxPermissionsService,
    private serviceConfigs: ServiceConfigsService,
    private rolseservice:RoleService) {
  }

  ngOnInit(): void {

    this.userRoles.push(this.roleList[this.serviceConfigs.deycrypt().user.role_id])

    this.permissionService.loadPermissions(this.userRoles)

    // this.rolseservice.fetchAll().pipe(
    //   map(res => res.map((a: any) => a.name)),
    // ).subscribe(roles => {
    //   this.permissionService.loadPermissions(roles)
    // })

    this.supportService.fetchAll(Api_Endpoints.support.task.list, {}).subscribe(
      res => {
        this.newNotifs.set(res.data.length)
      }
    );
  }

  toggleMenu() {
    this.menuservice.sideMenuOpen.set(!this.sideMenuOpen())
  }

}


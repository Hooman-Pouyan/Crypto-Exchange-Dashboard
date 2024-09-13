import {Directive, EventEmitter, Input, Output, signal} from "@angular/core";
import { NgxPermissionsService } from "ngx-permissions";
import {MenuItem} from "primeng/api";
import {AuthService} from "src/app/core/Authentication/auth.service";
import { ServiceConfigsService } from "src/app/core/Services/Shared Services/ServiceConfigs.service";
import {MenuService} from "src/app/core/Services/Shared Services/menu.service";

export enum roles {
  Owner,
  Admin,
  Operator
}

@Directive()
export abstract class BaseMenu {
  items!: MenuItem[];

  roleList: any = roles
  userRole!: string
  user: Object = {}

  allowedMenus = signal<any>([])

  @Output() _toggleMenu = new EventEmitter();
  @Input() newNotifs!: any;

  constructor(
    private menuservice:MenuService,
    private authservice: AuthService,
    private serviceConfigs:ServiceConfigsService,
    private permissionservice:NgxPermissionsService
    ) {
      // this.userRoles.push(this.roleList[this.serviceConfigs.deycrypt().user.role_id])
      // this.permissionservice.loadPermissions(this.userRole)
    }

  ngOnInit() {

    this.userRole = this.roleList[this.serviceConfigs.deycrypt().user.role_id - 1]
    this.user = this.serviceConfigs.deycrypt().user;

    this.allowedMenus.set(this.menuservice.items.filter((menuItem) => {
      // Check if the main menu item allows the user's role
      if (menuItem.queryParams && menuItem.queryParams instanceof Array && menuItem.queryParams.includes(this.userRole)) {
        // Step 3: Filter the submenus for this main menu item
        if (menuItem.items) {
          menuItem.items = menuItem.items.filter((submenuItem) => {
            if (submenuItem.queryParams instanceof Array) {
              return !submenuItem.queryParams || submenuItem.queryParams.includes(this.userRole);
            }else return
          });
        }
        return true; // Include the main menu item
      }
      return false; // Exclude the main menu item
    }))

    this.items = this.allowedMenus()

    }

  toggleMenu(){
    this._toggleMenu.emit()
  }

  logOut(){
    this.authservice!.logOut()
  }


}

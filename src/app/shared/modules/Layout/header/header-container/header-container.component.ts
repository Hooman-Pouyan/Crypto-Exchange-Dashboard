import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {MenuService} from "../../../../../core/Services/Shared Services/menu.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {ToolbarService} from 'src/app/core/Services/Shared Services/toolbar.service';
import { ServiceConfigsService } from 'src/app/core/Services/Shared Services/ServiceConfigs.service';


export enum roles {
  Owner,
  Admin,
  Operator
}



@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderContainerComponent implements OnInit {
  menuItems!: any[];
  toolbarItems!: any[];

  roleList: any = roles
  userRole!: string
  user: Object = {}

  isToolbarActivated = signal<boolean>(false)

  constructor(
    private toolbarservice: ToolbarService,
    private menuservice: MenuService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private serviceConfigs:ServiceConfigsService,
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isToolbarActivated.set(window.location.href.includes("edit") ? true : false)
      });
  }

  ngOnInit(): void {
    this.toolbarItems = this.toolbarservice.items!

    this.userRole = this.roleList[this.serviceConfigs.deycrypt().user.role_id - 1]
    this.user = this.serviceConfigs.deycrypt().user;

    const filteredMenu = this.menuservice.items.filter((menuItem) => {
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
    });

    this.menuItems = filteredMenu!

  }

  onAction(actionType: string) {
    switch (actionType) {
      case "create":
        this.toolbarservice.actions.create.update((a) => a + 1)
        break
      case "sync":
        this.toolbarservice.actions.sync.update((a) => a + 1)
        break
      case "update":
        this.toolbarservice.actions.update.update((a) => a + 1)
        break
      case "search":
        this.toolbarservice.actions.search.update((a) => a + 1)
        break
      case "calender":
        this.toolbarservice.actions.calender.update((a) => a + 1)
        break
      case "close":
        this.toolbarservice.actions.close.update((a) => a + 1)
        break
    }
  }
}

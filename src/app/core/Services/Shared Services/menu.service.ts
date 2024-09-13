import {Injectable, OnInit, signal} from '@angular/core';
import {AuthService} from '../../Authentication/auth.service';
import {MenuItem} from 'primeng/api';
import {ServiceConfigsService} from './ServiceConfigs.service';
import {NgxPermissionsService} from 'ngx-permissions';

export enum roles {
  Owner,
  Admin,
  Operator
}

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnInit {

  sideMenuOpen = signal<boolean>(true)
  sideMenuFixed = signal<boolean>(false)


  items: MenuItem[] = [
    {
      label: "داشبورد",
      title: "Dashboard",
      iconClass: "dashboard",
      routerLink: "/Dashboard",
      routerLinkActiveOptions: 'active',
      queryParams: ["Owner", "Admin", "Operator"],
    },
    {
      label: 'کاربران',
      icon: 'pi pi-fw pi-user',
      title: "users",
      iconClass: "supervised_user_circle",
      routerLinkActiveOptions: 'active',
      queryParams: ["Owner", "Admin"],

      items: [
        {
          label: 'لیست',
          icon: 'pi pi-fw pi-list pi-left',
          routerLink: 'users',
          routerLinkActiveOptions: 'active',
          queryParams: ["Owner", "Admin"],

          command: () => {
          },
        },
        {
          label: 'سطوح کاربری',
          icon: 'pi pi-fw pi-user',
          routerLink: 'club',
          routerLinkActiveOptions: 'active',
          queryParams: ["Owner", "Admin"],
        },
      ],
    },
    {
      label: 'پشتیبانی',
      title: "support",
      iconClass: "donut_small",
      icon: 'pi pi-support',
      routerLinkActiveOptions: 'active',
      queryParams: ["Owner", "Admin", "Operator"],

      items: [
        {
          title: "tasks",
          label: 'درخواست ها',
          icon: 'pi pi-send',
          routerLink: "support/tasks",
          queryParams: ["Owner", "Admin", "Operator"],
        },
        {
          title: "tickets",
          label: 'تیکت ها',
          icon: 'pi pi-fw pi-ticket',
          routerLink: "support/tickets",
          queryParams: ["Owner", "Admin", "Operator"],
        },
        {
          title: "offline-deposit",
          label: 'واریزی آفلاین',
          icon: 'pi pi-stop-circle',
          routerLink: "support/offline-deposit",
          queryParams: ["Owner", "Admin", "Operator"],
        }
      ],
    },
    {
      label: 'نرم افزار ها',
      title: "software",
      icon: 'pi pi-fw pi-desktop',
      iconClass: "devices",
      routerLinkActiveOptions: 'active',
      queryParams: ["Owner", "Admin"],


      items: [
        {
          label: 'مدیریت نسخه های برنامه',
          icon: 'pi pi-fw pi-android',
          routerLink: "apps",
          queryParams: ["Owner", "Admin"],


        },
      ],
    },
    {
      label: 'اطلاعات اصلی',
      title: "exchange",
      icon: 'pi pi-fw pi-briefcase',
      iconClass: "table_chart",
      routerLinkActiveOptions: 'active',
      queryParams: ["Owner", "Admin"],
      items: [
        {
          label: 'ارز ها',
          icon: 'pi pi-fw pi-bitcoin',
          routerLink: 'exchange/currency',
          routerLinkActiveOptions: 'active',
          queryParams: ["Owner", "Admin"],
          // command: () => this.sideMenuOpen.set(true),

        },
        {
          label: 'جفت ارز ها',
          icon: 'pi pi-fw pi-arrow-right-arrow-left',
          routerLink: 'exchange/currency_pairs',
          routerLinkActiveOptions: 'active',
          queryParams: ["Owner", "Admin"],
          // command: () => this.sideMenuOpen.set(true),

        },
        {
          label: 'شبکه ها',
          icon: 'pi pi-fw pi-cloud',
          routerLink: 'exchange/network',
          routerLinkActiveOptions: 'active',
          queryParams: ["Owner", "Admin"],
          // command: () => this.sideMenuOpen.set(true),

        },
        {
          label: 'آدرس شبکه ها',
          icon: 'pi pi-fw pi-file-excel',
          routerLink: 'exchange/networkAddress',
          routerLinkActiveOptions: 'active',
          queryParams: ["Owner", "Admin"],
          // command: () => this.sideMenuOpen.set(true),

        },
      ],
    },
    {
      label: 'گزارشات',
      title: "reports",
      icon: 'pi pi-fw pi-server',
      iconClass: "report",
      routerLinkActiveOptions: "active",
      queryParams: ["Owner", "Admin", "Operator"],

      items: [
        {
          label: 'مبادلات',
          icon: 'pi pi-fw pi-sort-alt',
          title: "exchanges",
          routerLink: "reports/exchanges",
          routerLinkActiveOptions: {exact: true},
          queryParams: ["Owner", "Admin", "Operator"],

          // command: () => this.sideMenuOpen.set(true),

        },
        {
          label: 'جفت ارز ها',
          icon: 'pi pi-fw pi-arrow-right-arrow-left',
          title: "reports",
          routerLink: "reports/currency_pairs",
          queryParams: ["Owner", "Admin", "Operator"],
          // command: () => this.sideMenuOpen.set(true),

        },
        {
          label: 'واریزی',
          icon: 'pi pi-fw pi-send',
          title: "pairCurrencies",
          routerLink: "reports/deposits",
          queryParams: ["Owner", "Admin", "Operator"],
          // command: () => this.sideMenuOpen.set(true),

        },
        {
          label: 'برداشت ها',
          icon: 'pi pi-fw pi-money-bill',
          title: "withdraws",
          routerLink: "reports/withdraws",
          queryParams: ["Owner", "Admin", "Operator"],
          // command: () => this.sideMenuOpen.set(true),

        },
        {
          label: 'موجودی کیف ها',
          icon: 'pi pi-fw pi-wallet',
          title: "wallets",
          routerLink: "reports/wallets",
          queryParams: ["Owner", "Admin"],
          // command: () => this.sideMenuOpen.set(true),

        },
        {
          label: 'آدرس ها',
          icon: 'pi pi-fw pi-home',
          title: "addresses",
          routerLink: "reports/addresses",
          queryParams: ["Owner", "Admin"],

        },
      ],
    },
    {
      label: "مراجع قیمت",
      title: "priceReference",
      iconClass: "monetization_on",
      icon: 'pi pi-fw pi-money-bill',
      queryParams: ["Owner", "Admin"],
      items: [
        {
          label: "لیست",
          title: "settings",
          iconClass: "addresses",
          icon: 'pi pi-fw pi-list',
          routerLink: "priceReference",
          routerLinkActiveOptions: "active",
          queryParams: ["Owner", "Admin"],

        },
        {
          label: "تنظیمات",
          title: "settings",
          iconClass: "settings",
          icon: 'pi pi-fw pi-wrench',
          routerLink: "priceReference/settings",
          routerLinkActiveOptions: "active",
          queryParams: ["Owner", "Admin"],
        },
      ]

    },
    // {
    //   label: "سوالات متداول",
    //   title:"faq",
    //   iconClass: "contact_support",
    //   icon: 'pi pi-fw pi-question',
    //   routerLink: "faq",
    //   routerLinkActiveOptions: "active",
    //   queryParams: ["Owner", "Admin", "Operator"],

    // },
    {
      label: "تنظیمات",
      title: "settings",
      iconClass: "settings",
      icon: 'pi pi-fw pi-cog',
      routerLink: "settings",
      routerLinkActiveOptions: "active",
      queryParams: ["Owner", "Admin", "Operator"],

    },
    {
      label: 'خروج از پنل',
      title: "Quit",
      icon: 'pi pi-fw pi-power-off',
      iconClass: "logout",
      styleClass: "ali",
      queryParams: ["Owner", "Admin", "Operator"],

      command: () => {
        this.authservice.logOut();
      },
    },
  ];

  roleList: any = roles
  userRoles: any = []


  constructor(
    private authservice: AuthService,
    private serviceConfigs: ServiceConfigsService,
    private permissionservice: NgxPermissionsService
  ) {
    console.log(this.serviceConfigs.deycrypt())
    this.userRoles.push(this.roleList[this.serviceConfigs.deycrypt().user.role_id])
    this.permissionservice.loadPermissions(this.userRoles)

  }

  ngOnInit(): void {

  }


}

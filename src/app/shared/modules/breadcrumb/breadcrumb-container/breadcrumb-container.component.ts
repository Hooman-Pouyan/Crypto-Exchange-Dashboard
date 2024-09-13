import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Subscription, filter, retry} from 'rxjs';
import {MenuService} from 'src/app/core/Services/Shared Services/menu.service';
import {ServiceConfigsService} from "../../../../core/Services/Shared Services/ServiceConfigs.service";
import {TranslateService} from "@ngx-translate/core";
import {Location} from '@angular/common';

@Component({
  selector: 'app-breadcrumb-container',
  templateUrl: './breadcrumb-container.component.html',
  styleUrls: ['./breadcrumb-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbContainerComponent implements OnDestroy {
  menuItems: Array<any> = [];
  loading = false;
  theme: string = "";
  subscriptions: Subscription[] = [];
  items = signal<MenuItem[]>([])
  home: MenuItem | undefined;

  constructor(
    private menuservice: MenuService,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceConfigsService: ServiceConfigsService,
    private translate: TranslateService) {
    const RouteSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.items.set(this.serviceConfigsService.uniqArray(this.createBreadcrumbs(this.activatedRoute.root)))
        this.removeDuplicates()
      });
    this.subscriptions.push(RouteSubscription)
  }

  ngOnInit() {
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  createBreadcrumbs(route: ActivatedRoute, routerLink: string = "", breadcrumbs: any = []): any {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
      if (routeURL !== "") {
        routerLink += `/${routeURL}`;
      }
      const label = this.translate.instant(child.snapshot.data["title"])
      const item = {label, routerLink}
      if (!breadcrumbs.includes(item))
        breadcrumbs.push(item);
      this.menuItems = breadcrumbs
      return this.createBreadcrumbs(child, routerLink, breadcrumbs);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
  }

  back() {
    this._location.back()
  }

  removeDuplicates() {
    this.items.set(this.items().filter(x=>x.label!=='نسخه ها' && x.label!=='ترجمه‌ها'))
  }
}

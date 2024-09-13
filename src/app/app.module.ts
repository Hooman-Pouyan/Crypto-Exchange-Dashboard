import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from './core/core.module';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
// import { LoaderModule } from './shared/Modules/loader/loader.module';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterceptor } from './core/Interceptors/token.interceptor';
import { ErrorhandleInterceptor } from "./core/Interceptors/errorhandle.interceptor";
import { TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPermissionsModule } from 'ngx-permissions';
import {MatPaginatorIntl} from "@angular/material/paginator";
import { getDutchPaginatorIntl } from './shared/modules/aggrid-base/pagination/dutch-paginator-intl';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),
    CoreModule,
    TieredMenuModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    PanelMenuModule,
    // LoaderModule,
    ToastrModule.forRoot({
      maxOpened: 1,
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  NgxPermissionsModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorhandleInterceptor,
      multi: true,
    },
    {
      provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl()
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	let url = "../assets/i18n/";
	if (!isDevMode()) url = "assets/i18n/";
	return new TranslateHttpLoader(http, url);
}


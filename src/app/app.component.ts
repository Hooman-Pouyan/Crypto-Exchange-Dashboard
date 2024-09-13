import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   trigger('routerTransition', [
  //     transition('* <=> *', [
  //       // Set up animation for the entering route
  //       query(':enter, :leave', [
  //         style({
  //           position: 'absolute',
  //           top: 0,
  //           left: 0,
  //           width: '100%',
  //         }),
  //       ]),
  //       query(':enter', [style({ opacity: 0 })]),
  //       query(':leave', animateChild()),
  //       group([
  //         query(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
  //         query(':enter', [animate('300ms ease-out', style({ opacity: 1 }))]),
  //       ]),
  //       query(':enter', animateChild()),
  //     ]),
  //   ]),
  // ],
})
export class AppComponent implements OnInit {

	getState(outlet: RouterOutlet) {
		return outlet.isActivated ? outlet.activatedRoute : "";
	}

  constructor(private ngxLoader: NgxUiLoaderService, private translate:TranslateService) {
    this.translate.use("fa")
  }

  ngOnInit(): void {
    // this.ngxLoader.startBackground()
    // this.ngxLoader.startLoader('loader-02')
  }
}

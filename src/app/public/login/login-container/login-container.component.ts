import {ChangeDetectionStrategy, Component, effect, signal, ViewChild, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/Authentication/auth.service';
import {ServiceConfigsService} from 'src/app/core/Services/Shared Services/ServiceConfigs.service';
import {ProgressBarMode} from "@angular/material/progress-bar";
import {catchError, finalize, map, Observable, takeWhile, throwError, timer} from "rxjs";
import { CoreService } from 'src/app/core/Services/Shared Services/core.service';
// @ts-ignore
// import * as anime from 'node_modules/animejs/lib/anime.js';


@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent implements OnInit {
  @ViewChild(FormGroupDirective, {static: false}) formGroupDirective!: FormGroupDirective
  secondsRemaining$!: Observable<any>
  nextStepLoading: ProgressBarMode = 'determinate'
  TokenType: string = '';
  Token: string = '';
  userLoginResponse = signal<any>({});
  loginButtonDisabled = signal<boolean>(false);
  secretKey!: string;
  securityOptions = signal<any[]>([])
  securityType = signal<string>('')
  showTimer=signal(true)
  loading = signal<boolean>(false)
  countries$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private serviceconfigs: ServiceConfigsService,
    private corfeservice:CoreService,
  ) {
    // if (this.authservice._isAuthenticated()) router.navigate(['Dashboard']);

    // const a = anime({
    //   targets: `.staggerTile`,
    //   duration: 2000,
    //   easing: 'easeInOutQuad',
    //   loop: true,
    //   direction: 'alternate',
    //   scale: [
    //     {value: .1, easing: 'easeOutSine', duration: 500},
    //     {value: 1, easing: 'easeInOutQuad', duration: 1200}
    //   ],
    //   delay: anime.stagger(200, {grid: [33, 10], from: 'center'}),
    //   autoplay:true
    // });


  }

  ngOnInit(): void {
    this.fetchCountries();

  }

  loginForm: FormGroup = this.fb.group({
    mobile_prefix: new FormControl('', [Validators.required]),
    type: new FormControl('' || 'password', [Validators.required]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    hash: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
  });

  _LoginStep = signal<number>(1);

  onCodeCompleted(hash: any) {
    if (this.securityType() == "email") this.AcceptConfirmEmail(this.secretKey, hash);
    else if (this.securityType() == "g2f") this.AcceptG2f(this.secretKey, hash);
  }

  login() {
    this.nextStepLoading = "indeterminate"
    this.loginButtonDisabled.set(true)
    this.authservice
      .logIn(this.loginForm.value)
      .pipe(
        catchError(err => {
          this.nextStepLoading = "determinate"
          this.loading.set(true)
          return throwError(err)
        } )
      )
      .subscribe(Response => {
        if (Response) {
          this.nextStepLoading = "determinate"
          this.loginButtonDisabled.set(true)
          switch (Response.type) {
            case "token":
              this.authResult(Response)
              break;
            case '2sv':
              this.securityOptions.set(Object.keys(Response.data))
              this._LoginStep.set(2);
              this.secretKey = Response.secret;
              this.sendConfirmEmail(Response.secret)
              break;
            case undefined:
              console.log('gtf');
              break;
          }
        }
      })
      .add(() => {
        this.nextStepLoading = "determinate"
        this.loginButtonDisabled.set(false)
        this.loginButtonDisabled.set(false)

      });
  }

  sendConfirmEmail(secretKey: string) {
    const email = new FormData();
    email.append('secret', secretKey);
    this.authservice.sendConfirmEmail(email).subscribe(Response => {
      console.log(Response);
    });
  }

  AcceptConfirmEmail(secretKey: string, hash: string) {
    this.nextStepLoading = "indeterminate";
    const email = new FormData();
    email.append('secret', this.secretKey);
    email.append('hash', hash);
    this.authservice
      .acceptConfirmEmail(email)
      .subscribe(Response => {
        this.authResult(Response)
      }).add(() => {
    this.nextStepLoading = "determinate";
      })

  }

  AcceptG2f(secretKey: string, hash: string) {
    this.nextStepLoading = "indeterminate";
    const g2f = new FormData();
    g2f.append('secret', this.secretKey);
    g2f.append('hash', hash);
    this.authservice
      .acceptG2f(g2f)
      .subscribe(Response => {
        this.authResult(Response)
      }).add(() => {
        this.nextStepLoading = "determinate";
          })
  }

  goBack() {
    if (this._LoginStep() === 1) return;
    this._LoginStep.set(1);
    // setTimeout(() => this.loginForm.reset(), 200);

  }

  chooseOptAuthOption(auth: string) {
    this._LoginStep.set(3)
    this.securityType.set(auth)
  }

  authResult(authResponse: any) {
    this.nextStepLoading = "determinate";


    if (authResponse.token) {
      this.Token = authResponse.token.access_token;
      this.TokenType = authResponse.token.token_type;
      this.userLoginResponse.set(authResponse);

      this.serviceconfigs.saveUserConfig(
        this.Token,
        this.TokenType,
        this.userLoginResponse()
      );

      this.authservice._isAuthenticated.set(true);
      this.authservice._isLoggedIn.set(true);
      this.authservice._Token.set(authResponse.token);
      if (this.userLoginResponse()) this.router.navigate(['/Dashboard']);
    }
  }

  setTimer() {
    this.secondsRemaining$ = timer(0, 1000).pipe(
      map(n => (60 - n) * 1000),
      takeWhile(n => n >= 0),
      finalize(() => {
        this.showTimer.set(false)
      })
    )
  }

  onStepChange = effect(() => {
    if (this._LoginStep() === 3) {
      this.setTimer()
    }
  })

  fetchCountries(){
    this.countries$ = this.corfeservice.fetchCountries()
  }

}

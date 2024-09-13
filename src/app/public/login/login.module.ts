import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginContainerComponent } from './login-container/login-container.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CodeInputModule } from 'angular-code-input';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginContainerComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CodeInputModule.forRoot({
      isCharsCode: true,
      isPrevFocusableAfterClearing: true,
      isFocusingOnLastByClickIfFilled: true,
    }),
    InputTextModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class LoginModule {}

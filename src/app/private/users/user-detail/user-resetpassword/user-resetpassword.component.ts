import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/Services/Feature Services/user.service';
import { ToastrMessagesService } from 'src/app/core/Services/Shared Services/toastr-messages.service';

@Component({
  selector: 'app-user-resetpassword',
  templateUrl: './user-resetpassword.component.html',
  styleUrls: ['./user-resetpassword.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserResetpasswordComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoutre:ActivatedRoute,
    private toast:ToastrMessagesService,
  ){

  }
  messageService = inject(ToastrMessagesService)
  userId!: number;
  resetPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.userId = this.activatedRoutre.snapshot.params["id"]

    this.resetPasswordForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), ])
    })

  }

  onSubmit(){
    if (this.resetPasswordForm.invalid
      ||
      (this.resetPasswordForm.get('password')?.value !== this.resetPasswordForm.get('passwordConfirm')?.value))
    {
      this.toast.showError("اطلاعات ورودی رو مجدد چک کنید")
      return
    }

    this.userService.resetPassword(
      this.userId,
      {password: this.resetPasswordForm.get("password")?.value}
    ).subscribe(res => {
        this.messageService.showSuccess(res.message ? res.message : "رمز عبور با موفقیت آپدیت شد")
    })

  }


}

import { ChangeDetectionStrategy, Component, Inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { ClubService } from 'src/app/core/Services/Feature Services/club.service';
import { ExchangeService } from 'src/app/core/Services/Feature Services/exchange.service';
import { UserService } from 'src/app/core/Services/Feature Services/user.service';
import { DialogService } from 'src/app/core/Services/Shared Services/dialog.service';
import { ToastrMessagesService } from 'src/app/core/Services/Shared Services/toastr-messages.service';
import {Router} from '@angular/router'
import { CoreService } from 'src/app/core/Services/Shared Services/core.service';
import { RoleService } from 'src/app/core/Services/Feature Services/role.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {

  users$!: Observable<any[]>;

  editMode = signal<boolean>(true)

  countries$!: Observable<any>
  roles$!: Observable<any>


  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private toast:ToastrMessagesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogService:DialogService,
    private Router:Router,
    private corfeservice:CoreService,
    private roleservice:RoleService
    ) {
      this.users$ = this.userService.fetchAll(Api_Endpoints.currency.all, {})
    console.log(this.data.data)

    }
  ngOnInit(): void {
    this.fetchCountries()
    this.fetchRoles()
    if (this.data.data) this.editMode.set(true)
  }


  newUserForm: FormGroup = this.fb.group({
    mobile_prefix: new FormControl(this.data.data.mobile_prefix),
    mobile: new FormControl(this.data.data.mobile),
    firstname: new FormControl(this.data.data.firstname),
    lastname: new FormControl(this.data.data.lastname),
    email: new FormControl(this.data.data.email),
    password: new FormControl(this.data.data.password),
    role_id: new FormControl(this.data.data.role_id),
  })

  fetchCountries(){
    this.countries$ = this.corfeservice.fetchCountries()
  }

  fetchRoles(){
    this.roles$ = this.roleservice.fetchAll()
  }

    onSubmit(){
      if (this.data.data.mobile == '') {
        this.userService.addUser(this.newUserForm.value).subscribe(res => {
          if (res) this.toast.showSuccess("کاربر جدید با موفقیت ایجاد شد")
            this.dialogService.response.set(!this.dialogService.response())
          this.dialog.closeAll()

        })
      }else {
        this.userService.updateUser(this.newUserForm.value,this.data.data.user_id).subscribe(res => {
          if (res) this.toast.showSuccess("کاربر با موفقیت آپدیت شد")
            this.dialogService.response.set(!this.dialogService.response())
          this.dialog.closeAll()

        })
      }
  }

}

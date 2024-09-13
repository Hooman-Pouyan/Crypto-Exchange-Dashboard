import { ChangeDetectionStrategy, Component, Input, signal, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { BaseTable } from 'src/app/core/Classes/Base_Table';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { IUser } from 'src/app/core/Models/IUser';
import { ExchangeService } from 'src/app/core/Services/Feature Services/exchange.service';
import { UserService } from 'src/app/core/Services/Feature Services/user.service';
import {BehaviorSubject, Observable} from "rxjs";
import { ToolbarService } from 'src/app/core/Services/Shared Services/toolbar.service';
import { AddComponent } from './user-commission/add/add.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/Services/Shared Services/dialog.service';
import { UserFormComponent } from '../Components/user-form/user-form.component';
import { WalletdetailComponent } from './user-wallet/walletdetail/walletdetail.component';


export enum roles {
  "مالک صرافی",
  "ادمین صرافی",
  "پشتیبان صرافی"
}


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent extends BaseTable implements OnInit {

  userData = signal<any>({})
  userSessions = signal<any>([])

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  userInfoActivated = signal<number>(1)

  refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  roles = roles

  personal = signal<boolean>(false)
  email = signal<boolean>(true)
  commitment = signal<boolean>(false)
  credit_card = signal<boolean>(false)

  constructor(
    private activatedroute:ActivatedRoute,
    private userservice:UserService,
    private toobarService: ToolbarService,
    public dialog: MatDialog,
    private dialogService:DialogService
  ){

    super(
      [
        {field: 'fee', pipe: '', editable: true},
        {field: 'action_type', pipe: ''},
        {field: 'unit', pipe: ''},
        {field: 'market', pipe: ''},
        {field: 'symbol_type', pipe: ''},
        {field: 'symbol', pipe: ''},
        {field: 'blocked', pipe: 'toggle'},
        // {field: 'operation', pipe: 'path'},
      ],
      userservice,
      Api_Endpoints.user.commission.show,
    )

  }

  ngOnInit(): void {
    this.items = [
      { label: 'اطلاعات اصلی',routerLink: "info", icon: 'pi pi-fw pi-home', id: '1', items: [
        { label: 'اطلاعات فردی', icon: 'pi pi-fw pi-home', id: '1', fragment: "1",},
        { label: 'کیف پول', icon: 'pi pi-fw pi-home', id: '1', fragment: "2",},
        { label: 'نشست های امنیتی', icon: 'pi pi-fw pi-calendar',id: '1', fragment: "3", },
        { label: 'وضعیت احراز', icon: 'pi pi-fw pi-calendar',id: '1', fragment: "4", },
      ] },
      { label: 'رمز ارز', routerLink: "currency", icon: 'pi pi-fw pi-calendar',id: '2', items: [

      ] },
      { label: 'جفت ارز',routerLink: 'currency-pair', icon: 'pi pi-fw pi-pencil', id: '3', items: [

      ] },
      { label: 'درخواست ها', routerLink: 'tasks', icon: 'pi pi-fw pi-pencil', id: '4', items: [

      ] },
      { label: 'سطح کاربری', routerLink: 'poanlevel', icon: 'pi pi-fw pi-pencil', id: '5', items: [

      ] },
      { label: 'رمز عبور', routerLink: 'password', icon: 'pi pi-fw pi-pencil', id: '6', items: [

      ] },
  ];

      this.activeItem = this.items![0];
      this.getUserData()

      console.log(this.userData())
  }

  onActiveItemChange(event: MenuItem) {
    if (event.items) this.activeItem! = event
    else {
      this.userInfoActivated.set(+event.fragment!)
      this.activeItem!['id'] = event['id']
    }
}


getUserData(){
    this.activatedroute.params.subscribe(res => {
      this.userservice.getUser(res['id']).subscribe(userData => {
        this.email.set(JSON.parse(userData.identification).email)
        this.personal.set(JSON.parse(userData.identification).identity)
        this.commitment.set(JSON.parse(userData.identification).commitment)
        this.credit_card.set(JSON.parse(userData.identification).user_credit_card)
        this.userData.set(userData)
      })
    })
}

openDialog(data: any): void {
    this.dialogService.openDialog(data, AddComponent)
}

openWalletDetail(data: any){
  this.dialogService.openDialog(data, WalletdetailComponent)
}


onCreate = effect(() => {
  if (this.toobarService.actions.create() != 1 && window.location.href.includes("currency")) this.openDialog({
    data: {
      user_id: this.userData().id,
      fee: '',
      action_type: '',
      market: '',
      symbol_type: '',
      symbol: '',
      blocked: false,
    }
})
})

onRefresh = effect(() => {
  if (this.dialogService.response() != null) this.refresh.next(!this.refresh.value)
})

onSync = effect(() => {
  if (this.toobarService.actions.sync() != null) this.refresh.next(!this.refresh.value)
})

onUpdate = effect(() => {
  if (this.toobarService.actions.update() != 1 && window.location.href.includes("info")) {
    this.dialogService.openDialog({
      data: {
        user_id: this.userData().id,
        mobile_prefix: this.userData().mobile_prefix,
        mobile: this.userData().mobile,
        firstname: this.userData().firstname,
        lastname: this.userData().lastname,
        email: this.userData().email,
        role_id: this.userData().role_id,
      }
  }, UserFormComponent)
  }
})

ngOnDestroy(): void {
  this.toobarService.toolbarActionsReset()
}

}







import { ChangeDetectionStrategy, Component, effect, OnDestroy, signal, Type } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { BaseTable } from 'src/app/core/Classes/Base_Table';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/Services/Feature Services/user.service';
import { ToolbarService } from 'src/app/core/Services/Shared Services/toolbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ClubService } from 'src/app/core/Services/Feature Services/club.service';
import { DialogService } from 'src/app/core/Services/Shared Services/dialog.service';
import { BehaviorSubject } from 'rxjs';
import { AddComponent } from '../club-commission/add/add.component';
import { ClubFormComponent } from './club-form/club-form.component';
import {ActionService} from "../../../../core/Services/Shared Services/action.service";

@Component({
  selector: 'app-level-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class clubDetailComponent extends BaseTable implements OnDestroy {


  clubCommissionFormComponent = AddComponent;
  clubFormComponent = ClubFormComponent;

  levelData = signal<any>({})
  levelDescriptions = signal<any>([])

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  userInfoActivated = signal<number>(1)

  refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private activatedroute:ActivatedRoute,
    private clubService:ClubService,
    private toobarService: ToolbarService,
    public dialog: MatDialog,
    private dialogService:DialogService,
    private actionService:ActionService
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
        {field: 'delete', pipe: 'delete', path:Api_Endpoints.club.delete},
        {field: 'edit', pipe: 'edit'},
      ],
      clubService,
      Api_Endpoints.club.commission.show,
    )
  }
  ngOnDestroy(): void {
    this.toobarService.toolbarActionsReset()
  }

  ngOnInit(): void {``
    this.items = [
      { label: 'اطلاعات اصلی',routerLink: "info", icon: 'pi pi-fw pi-home', id: '1', items: [
        { label: 'فارسی', icon: 'pi pi-fw pi-home', id: '1', fragment: "1",},
        { label: 'انگلیسی', icon: 'pi pi-fw pi-calendar',id: '1', fragment: "2", },
      ] },
      { label: 'رمز ارز',routerLink: "currency", icon: 'pi pi-fw pi-bitcoin',id: '2', items: [

      ] },
      { label: 'جفت ارز',routerLink: "currency-pair", icon: 'pi pi-fw pi-pencil', id: '3', items: [

      ] },
  ];
      this.activeItem = this.items![0];
      this.getLevelData()

  }

  onActiveItemChange(event: MenuItem) {
    if (event.items) this.activeItem! = event
    else {
      this.userInfoActivated.set(+event.fragment!)
      this.activeItem!['id'] = event['id']
    }

}


getLevelData(){
    this.activatedroute.params.subscribe(res => {
      this.clubService.fetchLevel(res['id']).subscribe(levelData => {
        this.levelData.set(levelData)
      })
    })
}

openDialog<T>(commissionData: any, componentType: Type<T>): void {
  this.dialogService.openDialog(commissionData, componentType)
}

onCreate = effect(() => {
  if (this.toobarService.actions.create() != 1 && window.location.href.includes("currency")) this.openDialog({
    data: {
      poan_level_id: this.levelData().id,
      fee: '',
      action_type: '',
      market: '',
      symbol_type: '',
      symbol: '',
      grade: "level",
      blocked: false,
    }
}, this.clubCommissionFormComponent)
else if (this.toobarService.actions.create() != 1 && window.location.href.includes("info")) this.openDialog({
  data: {
    poan_from: '',
    poan_to: '',
    fee_percent_discount: '',
    max_deposit_day: '',
    max_deposit_month: '',
    max_withdraw_day: '',
    max_withdraw_month: '',
    commission_percent: '',
    status: '',
    descriptions: ''
  }
}, this.clubFormComponent)
})

// onRefresh = effect(() => {
//   if (this.dialogService.response() != null) this.refresh.next(!this.refresh.value)
// })

onSync = effect(() => {
  if (this.toobarService.actions.sync() != null) this.refresh.next(!this.refresh.value)
})

  onRefresh = effect(() => {
  if (this.actionService._refreshData() != null) this.refresh.next(!this.refresh.value)
})

onUpdate = effect(() => {
  if (this.toobarService.actions.update() != 1 && window.location.href.includes("info")) {
  console.log(this.levelData())

  this.openDialog({
    data: this.levelData()
}, this.clubFormComponent)
  }
})

}

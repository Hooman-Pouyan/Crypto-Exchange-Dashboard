import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { BaseTable } from 'src/app/core/Classes/Base_Table';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { SupportService } from 'src/app/core/Services/Feature Services/support.service';
import { UserService } from 'src/app/core/Services/Feature Services/user.service';
import { ToolbarService } from 'src/app/core/Services/Shared Services/toolbar.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
  providers: [DialogService]
})
export class UserTasksComponent extends BaseTable {

  userTasks$!: Observable<any>

  @Input() symbol_type: any;
  @Output() editCommission = new EventEmitter<any>

  @Input() set refresh(value: boolean) {
    this.getUserTasks()
  }

  @Input() userId!: number;

  _refreshRows = signal<any>([])

  constructor(
    private activatedroute: ActivatedRoute,
    private userservice: UserService,
    private toobarService: ToolbarService,
    private dialogService: DialogService,
    private supportService: SupportService,
    private router: Router,
  ) {
    super(
      [
        {field: 'id', pipe: ''},
        {field: 'type_name', pipe: ''},
        {field: 'created_at', pipe: ''},
        {field: 'updated_at', pipe: ''},
        {field: 'status', pipe: ''},
        {field: 'detail', pipe: 'popup', path: "no-pop"},
      ],
      supportService,
      Api_Endpoints.support.task.list,
    )
  }

  ngOnInit(): void {
    this.getUserTasks()
  }

  getUserTasks() {
    this.userTasks$ = this.userservice.getUserTasks(this.userId)
    .pipe(
      map(res => res.data),
      map(res => res.filter((task: any) => {
        return task.user_id == this.userId
      })),
      tap(res => console.log(res)),
      )
  }

  override cellClicked(e: any) {
    if (e.colDef.headerName == "جزئیات") this.router.navigate([`/Dashboard/support/tasks/${e.data.id}`]);
  }


}

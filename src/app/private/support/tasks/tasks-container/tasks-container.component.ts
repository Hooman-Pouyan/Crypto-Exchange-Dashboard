import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import { SupportService } from 'src/app/core/Services/Feature Services/support.service';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { EnumType } from 'typescript';
import { Router } from '@angular/router';

export enum taskTypes {

  "کارت بانکی کاربران" = 1,
  "درخواست برداشت کمیسیون" = 2,
  "احرازهویت" = 3,
  // "کارت بانکی کاربران" = 1,
}

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksContainerComponent implements OnInit {

  tasks = signal<any>([])

  currentTab = signal<number>(1)
  tabIndex = window.location.href.includes("archive") ? 1 : 0


  constructor(
    private supportservice:SupportService,
    private router:Router){

  }

  ngOnInit(): void {
  }

  changeTab(tabIndex: any) {
    this.router.navigate([`Dashboard/support/${tabIndex.index == 1 ? 'tasks/archive' : 'tasks'}`])
    this.currentTab.set(tabIndex)
  }



}

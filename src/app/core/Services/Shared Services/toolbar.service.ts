import { Injectable, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  // toolbar or navbar
  isToolbarActivated = signal<boolean>(false)


  //  Toolbar Actions
  actions = {
    create: signal<number>(1),
    sync: signal<number>(1),
    update: signal<number>(1),
    search: signal<number>(1),
    calender: signal<number>(1),
    close: signal<number>(1)
  }


  toolbarActionsReset(){
    Object.entries(this.actions).forEach(data => {
      data[1].set(1);
    })

  }

  //  toolbar submenu
  items: MenuItem[] = [
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        title: "zasdsadas",
        command: () => {

        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-times'
    },
    {
        label: 'Angular',
        icon: 'pi pi-external-link',
        url: 'http://angular.io'
    },
    {
        label: 'Router',
        icon: 'pi pi-upload',
        routerLink: '/fileupload',
        items: [
          {
            label: 'dasdasd'
          }
        ]
    }
];

  constructor() { }

  ngOnInit() {
  }



}


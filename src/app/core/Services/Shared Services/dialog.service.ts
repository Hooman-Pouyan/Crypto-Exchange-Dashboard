import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, TemplateRef, Type, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  response = signal<boolean>(false)

  constructor(
    public dialog: MatDialog,
  ) { }

  openDialog<T>(Data: any,componentType: Type<T>): void {

    const dialogRef = this.dialog.open(componentType, {
      data: Data,
      maxHeight: '90vh',
      minWidth:'400px',
      disableClose:true,
      closeOnNavigation: true,
      autoFocus: true,
      enterAnimationDuration: 400,
      exitAnimationDuration: 400,
      panelClass: 'dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.response.set(true)
    });
  }

}

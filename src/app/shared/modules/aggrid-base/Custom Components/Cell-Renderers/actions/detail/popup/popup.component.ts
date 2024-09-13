import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DialogService} from 'src/app/core/Services/Shared Services/dialog.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  loadData=false;
  searchedItem!: string
  prices: any[] = []
  filteredPrices: any[] = []

  cdnUrl = environment.cdnUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) {
    this.info.subscribe(
      (response: any) => {
        this.prices = Object.entries(response)
        this.filteredPrices = this.prices
        this.loadData=true
      }
    )
  }

  close() {
    this.dialog.closeAll()
  }

  info = this.data

  search($event: any) {
    const keyword = $event.target.value.toLowerCase()
    this.prices = this.filteredPrices.filter(item => item[0].toLowerCase().indexOf(keyword) >= 0)
  }
}

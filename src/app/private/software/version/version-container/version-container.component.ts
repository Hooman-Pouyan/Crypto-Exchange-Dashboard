import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SoftwareService} from "../../../../core/Services/Feature Services/software.service";
import {Api_Endpoints} from "../../../../core/Configs/Api_Endpoints";
import {environment} from "../../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {AddComponent} from "../add/add.component";

@Component({
  selector: 'app-version-container',
  templateUrl: './version-container.component.html',
  styleUrls: ['./version-container.component.scss']
})
export class VersionContainerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'file', 'active', 'operation'];
  versions = signal<any>([])
  appId = 0;
  fileUrl = environment.fileUrl
  loadData = signal(false)

  constructor(
    private activatedRoute: ActivatedRoute,
    private softwareService: SoftwareService,
    private toast: ToastrService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.appId = this.activatedRoute.snapshot.params['id']
    this.getVersions()
  }

  setActiveVersion(id: number) {
    this.loadData.set(false)
    const rows = this.versions()
    for (let i = 0; i < rows.length; i++) {
      rows[i].active = false
    }
    this.versions.set(rows)
    const apiUrl = Api_Endpoints.app.software.version + this.appId + '/set_active_version'
    this.softwareService.updateByKey(apiUrl, {version_id: id}).subscribe(
      (response) => {
        this.toast.success(response.message)
        this.getVersions()
      }
    )
  }


  addVersion(element: any) {
    const dialog = this.matDialog.open(AddComponent, {
      disableClose: true,
      data: {
        id: this.appId,
        elementId: element?.id,
        data: element
      }
    })
    dialog.afterClosed().subscribe(
      (response) => {
        this.getVersions()
      }
    )
  }

  getVersions() {
    this.loadData.set(false)
    this.softwareService.fetchById(Api_Endpoints.app.software.version + this.appId + '/version').subscribe(
      (response) => {
        this.versions.set(response)
        this.loadData.set(true)
      }, error => {
        this.loadData.set(true)
      }
    )
  }
}

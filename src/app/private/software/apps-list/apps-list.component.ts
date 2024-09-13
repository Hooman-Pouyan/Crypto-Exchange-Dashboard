import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {SoftwareService} from "../../../core/Services/Feature Services/software.service";
import {Api_Endpoints} from "../../../core/Configs/Api_Endpoints";

@Component({
  selector: 'apps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppsListComponent {
  apps = signal<any>([])
  loadData =signal(false)

  constructor(private softwareService: SoftwareService) {
  }

  ngOnInit() {
    this.softwareService.fetchAll(Api_Endpoints.app.software.list, {}).subscribe(
      (response) => {
        this.apps.set(response)
        this.loadData.set(true);
      }, error => {
        this.loadData.set(true);
      }
    )
  }

  getFirstChar(name: string): string {
    return name.charAt(0)
  }
}

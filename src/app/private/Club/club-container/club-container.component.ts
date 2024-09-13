import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseTable } from 'src/app/core/Classes/Base_Table';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { ClubService } from 'src/app/core/Services/Feature Services/club.service';
import { ReportService } from 'src/app/core/Services/Feature Services/report.service';

@Component({
  selector: 'app-club-container',
  templateUrl: './club-container.component.html',
  styleUrls: ['./club-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class clubContainerComponent extends BaseTable  {

  constructor(private clubService:ClubService) {
    super(
      [
        {field: 'name', pipe: '', valueFormat: 'descriptions'},
        {field: 'fee_percent_discount', pipe: ''},
        {field: 'poan_from', pipe: '',},
        {field: 'poan_to', pipe: '',},
        {field: 'status', pipe: 'toggle', path: Api_Endpoints.club.status},
        {field: 'delete', pipe: 'delete', path:Api_Endpoints.club.delete},
        {field: 'edit', pipe: 'edit'},
      ],
      clubService,
      Api_Endpoints.club.list
    )
  }

}

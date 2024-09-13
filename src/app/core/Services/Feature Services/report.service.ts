import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import { ServiceConfigsService } from '../Shared Services/ServiceConfigs.service';
import { Api_Endpoints } from '../../Configs/Api_Endpoints';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private serviceconfigs:ServiceConfigsService,
    private http:HttpClient) {
    }

  fetchAll(apiEndpoint: string,queryParams: Object): Observable<any>{
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    const param = this.serviceconfigs.createQueryParams(queryParams)
    return this.http.get<any>(this.serviceconfigs.apiUrl + apiEndpoint, {headers: header, params: param}).pipe(
        // takeUntilDestroyed()
    )
  }
}

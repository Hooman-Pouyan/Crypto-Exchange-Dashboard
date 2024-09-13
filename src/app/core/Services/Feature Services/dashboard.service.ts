import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { ServiceConfigsService } from '../Shared Services/ServiceConfigs.service';
import { Api_Endpoints } from '../../Configs/Api_Endpoints';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private serviceconfigs:ServiceConfigsService,
    private http: HttpClient) { }

  getDashboard(): Observable<any>{
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(this.serviceconfigs.apiUrl + Api_Endpoints.dashboard, {headers: header}).pipe(
    )
  }

  getOnlineUsers(){
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    const param = this.serviceconfigs.createQueryParams({
      online: true
    })
    return this.http.get<any>(this.serviceconfigs.apiUrl + Api_Endpoints.user.list, {headers: header, params: param}).pipe(
    )
  }
}

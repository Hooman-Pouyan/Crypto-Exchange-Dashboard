import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceConfigsService } from '../Shared Services/ServiceConfigs.service';
import { Observable } from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import { Api_Endpoints } from '../../Configs/Api_Endpoints';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(
    private http: HttpClient,
    private serviceconfigs: ServiceConfigsService
  ) { }

  fetchAll(apiEndpoint: string, queryParams: Object): Observable<any> {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    const param = this.serviceconfigs.createQueryParams(queryParams)
    return this.http.get<any>(this.serviceconfigs.apiUrl + apiEndpoint, {headers: header, params: param}).pipe(
        // takeUntilDestroyed()
    )
  }

  fetchById(id: number, apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${apiEndpoint}${id}`, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }

  updateData(id: number,updateData: any, apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.put<any>(`${this.serviceconfigs.apiUrl}${apiEndpoint}${id}`, updateData, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }

  replyTicket(Data: any){
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.post<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.support.ticket.comments}`, Data, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }

  patchData(id: number,updateData: any, apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.patch<any>(`${this.serviceconfigs.apiUrl}${apiEndpoint}${id}`, updateData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }
}


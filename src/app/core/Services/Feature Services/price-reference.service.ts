import {Injectable, signal} from '@angular/core';
import { ServiceConfigsService } from '../Shared Services/ServiceConfigs.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Api_Endpoints } from '../../Configs/Api_Endpoints';

@Injectable({
  providedIn: 'root'
})
export class PriceReferenceService {
  // refreshPrices=signal(false)
  constructor(
    private http:HttpClient,
    private serviceConfigs:ServiceConfigsService
  ) { }

  fetchAll(apiEndpoint: string, queryParams: Object): Observable<any> {
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    const param = this.serviceConfigs.createQueryParams(queryParams)
    return this.http.get<any>(this.serviceConfigs.apiUrl + apiEndpoint, {headers: header, params: param})
  }

  fetchById(id: string, apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceConfigs.apiUrl}${apiEndpoint}${id}`, {headers: header})
  }

  addReference(referenceData: any) {
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.post<any>(`${this.serviceConfigs.apiUrl}${Api_Endpoints.pricereference.add}`, referenceData, {headers: header})
  }

  getAutomationModeSetting(){
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceConfigs.apiUrl}${Api_Endpoints.pricereference.AutomationSetting.show}`, {headers: header})
  }

  updateAutomationModeSetting(data: any){
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.put<any>(`${this.serviceConfigs.apiUrl}${Api_Endpoints.pricereference.AutomationSetting.update}`, data, {headers: header})
  }
}

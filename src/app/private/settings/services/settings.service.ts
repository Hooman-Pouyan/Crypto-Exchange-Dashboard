import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { ServiceConfigsService } from 'src/app/core/Services/Shared Services/ServiceConfigs.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http:HttpClient,
    private serviceConfigs:ServiceConfigsService,
  ) { }

  fetchSettings(settingType: string): Observable<any>{
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.get<any>(this.serviceConfigs.apiUrl + settingType, {headers: header}).pipe(
    )
  }

  updateSettings(api: string, data: any): Observable<any>{
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.put<any>(this.serviceConfigs.apiUrl + api, data, {headers: header}).pipe(
    )
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceConfigsService } from './ServiceConfigs.service';
import { Api_Endpoints } from '../../Configs/Api_Endpoints';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    private http:HttpClient,
    private serviceconfigs: ServiceConfigsService
  ) { }

  fetchCountries() {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(false))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.core.country}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

}

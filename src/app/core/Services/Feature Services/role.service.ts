import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfigsService } from '../Shared Services/ServiceConfigs.service';
import { Api_Endpoints } from '../../Configs/Api_Endpoints';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private serviceConfigs: ServiceConfigsService,
    private http:HttpClient
  ) { }

  fetchAll(): Observable<any>{
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.get<any>(this.serviceConfigs.apiUrl + Api_Endpoints.roles.list, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }
}

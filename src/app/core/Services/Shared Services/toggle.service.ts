import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceConfigsService } from './ServiceConfigs.service';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  constructor(
    private serviceConfigs:ServiceConfigsService,
    private http:HttpClient
  ) { }

  toggleData(id:number,apiEndpoint:string, status: any){
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.patch<any>(`${this.serviceConfigs.apiUrl}${apiEndpoint}${id}`,status, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }
}

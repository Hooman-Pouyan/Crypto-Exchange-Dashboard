import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConfigsService} from "../Shared Services/ServiceConfigs.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(
    private http: HttpClient,
    private serviceConfigs: ServiceConfigsService) {
  }

  fetchAll(apiEndpoint: string, queryParams: Object): Observable<any> {
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    const param = this.serviceConfigs.createQueryParams(queryParams)
    return this.http.get<any>(this.serviceConfigs.apiUrl + apiEndpoint, {headers: header, params: param})
  }

  fetchById( apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceConfigs.apiUrl}${apiEndpoint}`, {headers: header})
  }

  updateByKey(apiEndpoint: string, updatedData: any) {
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.post<any>(`${this.serviceConfigs.apiUrl}${apiEndpoint}`, updatedData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  addSoftware(apiEndpoint: string, updatedData: any) {
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.post<any>(`${this.serviceConfigs.apiUrl}${apiEndpoint}`, updatedData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  getTranslations(apiEndpoint: string){
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceConfigs.apiUrl}${apiEndpoint}`, {headers: header})
  }

  deleteData(apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.delete<any>(`${this.serviceConfigs.apiUrl}${apiEndpoint}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  addLanguageCode(apiEndpoint: string, updatedData: any) {
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.post<any>(`${this.serviceConfigs.apiUrl}${apiEndpoint}`, updatedData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }
}

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {ServiceConfigsService} from '../Shared Services/ServiceConfigs.service';
import {IUser} from '../../Models/IUser';
import {Api_Endpoints} from '../../Configs/Api_Endpoints';


@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(
    private http: HttpClient,
    private serviceconfigs: ServiceConfigsService
  ) {
  }

  refreshTable = signal<boolean>(false)

  fetchAll(apiEndpoint: string, queryParams: Object): Observable<any> {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    const param = this.serviceconfigs.createQueryParams(queryParams)
    return this.http.get<any>(this.serviceconfigs.apiUrl + apiEndpoint, {headers: header, params: param})
  }

  fetchById(id: string, apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${apiEndpoint}${id}`, {headers: header})
  }

  updateData(updateData: any, apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    let apiUrl = this.serviceconfigs.apiUrl + apiEndpoint + updateData.id
    return this.http.put<any>(apiUrl, updateData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  addData(updateData: any, apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.post<any>(this.serviceconfigs.apiUrl + apiEndpoint, updateData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  deleteData(updatedData: any, apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.put<any>(`${this.serviceconfigs.apiUrl}${apiEndpoint}/${updatedData.id}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  updateByKey(id: number, apiEndpoint: string, updatedData: any) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.patch<any>(`${this.serviceconfigs.apiUrl}${apiEndpoint}/${id}`, updatedData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  getUserSettings(userId: number) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<IUser>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.commission}${userId}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  getAllCurrencies() {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.currency.all}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  getCurrencyAccounts(queryParams: Object) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    const param = this.serviceconfigs.createQueryParams(queryParams)
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.currency.address.show}`, {
      headers: header,
      params: param
    }).pipe(
      // takeUntilDestroyed()
    )
  }

  getCurrencySettings(queryParams: Object) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    const param = this.serviceconfigs.createQueryParams(queryParams)
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.currency.setting.show}`, {
      headers: header,
      params: param
    }).pipe(
      // takeUntilDestroyed()
    )
  }

  addCurrencyAddress(apiEndpoint: string, updateData: any) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.post<any>(this.serviceconfigs.apiUrl + apiEndpoint, updateData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  addCurrencySetting(apiEndpoint: string, updateData: any) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.post<any>(this.serviceconfigs.apiUrl + apiEndpoint, updateData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  addNetworkAddress(apiEndpoint: string, updateData: any) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.post<any>(this.serviceconfigs.apiUrl + apiEndpoint, updateData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }
}

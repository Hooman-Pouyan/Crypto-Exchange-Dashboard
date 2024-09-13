import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServiceConfigsService} from '../Shared Services/ServiceConfigs.service';
import {Observable} from 'rxjs';
import {IUser} from '../../Models/IUser';
import {Api_Endpoints} from '../../Configs/Api_Endpoints';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private serviceconfigs: ServiceConfigsService,
    private http: HttpClient
  ) {
  }

  fetchAll(apiEndpoint: string, queryParams: Object, payload: any = ''): Observable<any> {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true));
    const param = this.serviceconfigs.createQueryParams(queryParams)
    return this.http.get<any>(this.serviceconfigs.apiUrl + apiEndpoint + `/${payload}`, {
      headers: header,
      params: param
    }).pipe(
      // takeUntilDestroyed()
    )
  }

  getUser(userId: number): Observable<any> {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.details}${userId}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  getUserSessions(userId: number) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<IUser>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.session}${userId}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  getUserCommmisions(userId: number) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.commission.show}${userId}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  addUserCommission(userId: number, commissionData: any) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.post<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.commission.add}`, commissionData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  updateUserCommission(commissionId: number, commissionData: any) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.put<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.commission.edit}${commissionId}`, commissionData, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  deleteUserCommission(commissionId: number) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.delete<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.commission.delete}${commissionId}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }


  unblockUser(userId: number) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.patch<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.unblock}${userId}`, {}, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  resetPassword(userId: number, newPassword: any) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.patch<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.resetPassword}${userId}`, newPassword, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  blockUser(userId: number) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.patch<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.block}${userId}`, {}, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  addUser(data: any) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.post<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.add}`, data, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  updateUser(data: any, userId: number) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.put<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.update}${userId}`, data, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  getUserWallet(userId: number) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.user.wallet}${userId}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  getUserTasks(userId: number) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.support.task.list}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

  getMarkets(){
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.market.list}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }
}

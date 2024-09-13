import { Injectable } from '@angular/core';
import { ServiceConfigsService } from '../Shared Services/ServiceConfigs.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Api_Endpoints } from '../../Configs/Api_Endpoints';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(
  private serviceconfigs:ServiceConfigsService,
  private http:HttpClient
  ) { }

  fetchAll(apiEndpoint: string, queryParams: any,payload: any = ''): Observable<any> {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    const param = this.serviceconfigs.createQueryParams(queryParams)
    return this.http.get(this.serviceconfigs.apiUrl + apiEndpoint, {params: param, headers: header}).pipe(
      )
  }

  fetchLevel(levelId: number): Observable<any>{
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.club.detail}${levelId}`, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }


  getLevelCommmisions(levelId: number){
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.club.commission.show}${levelId}`, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }

  getAllLevels(){
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.club.list}`, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }

  addLevelCommission(levelId: number, commissionData: any){
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.post<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.club.commission.add}`,commissionData, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }

  updateLevelCommission(commissionId: number, commissionData: any){
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.put<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.club.commission.edit}${commissionId}`,commissionData, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }

  getUserLevel(userId: any){
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.get<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.club.getUserLevel}${userId}`,
    {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }

  updateUserLevel(userId: any, selectedLevel: any){
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.patch<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.club.updateUserPoanLevel}${userId}`,selectedLevel, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }

  deleteLevelCommission(commissionId: number){
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders(true))
    return this.http.delete<any>(`${this.serviceconfigs.apiUrl}${Api_Endpoints.club.commission.delete}${commissionId}`, {headers: header}).pipe(
        // takeUntilDestroyed()
    )
  }
}


import {effect, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConfigsService} from "./ServiceConfigs.service";

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  _refreshData = signal<boolean>(false)

  check = effect(() => {
  })

  constructor(
    private serviceConfigs: ServiceConfigsService,
    private http: HttpClient
  ) {
  }


  deleteData(id: number, apiEndpoint: string) {
    const header = new HttpHeaders(this.serviceConfigs.getApiHeaders(true))
    return this.http.delete<any>(`${this.serviceConfigs.apiUrl}${apiEndpoint}${id}`, {headers: header}).pipe(
      // takeUntilDestroyed()
    )
  }

}

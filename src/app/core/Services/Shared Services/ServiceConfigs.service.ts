import {HttpParams} from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {environment} from 'src/environments/environment';
import {ToastrMessagesService} from './toastr-messages.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceConfigsService {

  public apiUrl!: string;
  public language = signal<string>('fa');
  public timezone = signal<string>('asia/Tehran');
  public token = localStorage.getItem("token")!;
  public tokenType = "Bearer";
  public tokenExpireTime = signal<string>('')
  router: any;

  allowedFileTypes = [
    'image',
    'application/pdf',
    'application/x-zip-compressed',
    'text/plain'
  ]

  constructor(
    private toast: ToastrMessagesService,
    private translate: TranslateService
  ) {

    this.apiUrl = environment.baseUrl + "/api"

  }

  getApiHeaders(useToken: boolean = false) {
    const apiHeader: any = {};
    const token = localStorage.getItem("token")!
    apiHeader["Accept-Timezone"] = this.timezone();
    apiHeader["Accept-Language"] = this.language();

    if (useToken && token) {
      apiHeader["Authorization"] = this.tokenType + " " + token;
    }
    return apiHeader;

  }

  saveUserConfig(token: string, tokenType: string, userData: object, timezone = "Asia/Tehran") {
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("tokenType", tokenType);
    window.localStorage.setItem("timezone", timezone);
    window.localStorage.setItem("userToken", this.encrypt(JSON.stringify(userData)));
    // this.updateUserConfig();
  }

  encrypt(string: string) {
    return btoa(encodeURIComponent(string));
  }

  deycrypt() {
    if (localStorage.getItem('userToken'))
      return JSON.parse(decodeURIComponent(atob(localStorage.getItem('userToken')!)))
    else
      localStorage.clear()
  }

  removeAuth() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userToken");
  }

  updateUserConfig() {
    this.token = localStorage.getItem("token")!;
    this.tokenType = <string>localStorage.getItem("tokenType");
    this.timezone.set(<string>localStorage.getItem("timezone") || "asia/Tehran");
    this.language.set(<string>localStorage.getItem("language") || "en");
  }


  toEnglishNumber(value: string) {
    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
      arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    for (let i = 0; i < 10; i++) {
      value = String(value).replace(persianNumbers[i], String(i)).replace(arabicNumbers[i], String(i));
    }
    return value;
  }

  createQueryParams(params: Object) {
    let queryParams = new HttpParams();
    const paramsEntries = Object.entries(params);

    for (let param of paramsEntries) {
      queryParams = queryParams.set(param[0], param[1]);
    }
    return queryParams;
  }

  maxUploadSize = 1000;

  uniqArray(arr: any[]) {
    return arr.filter((v, i, a) => a.findIndex(v2 => (JSON.stringify(v2) === JSON.stringify(v))) === i)
  }

  checkFileRules(file: any) {
    const typeFlag = this.allowedFileTypes.includes(file.type) || file.type.indexOf('image') >= 0
    if (!typeFlag) {
      this.toast.showError(this.translate.instant('error file type'))
      return false;
    } else {
      const sizeFlag = Math.floor(file.size / 1000) < this.maxUploadSize
      if (!sizeFlag) {
        this.toast.showError(this.translate.instant('error file size'))
        return false;
      }
    }
    return true;
  }
}

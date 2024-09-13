import {Component, signal} from '@angular/core';
import {ExchangeService} from "../../../../core/Services/Feature Services/exchange.service";
import {Api_Endpoints} from "../../../../core/Configs/Api_Endpoints";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrMessagesService} from "../../../../core/Services/Shared Services/toastr-messages.service";

@Component({
  selector: 'app-network-address-container',
  templateUrl: './network-address-container.component.html',
  styleUrls: ['./network-address-container.component.scss']
})
export class NetworkAddressContainerComponent {
  networks = signal<any>([])
  form!: FormGroup
  file: any;
  selectedFile = '';

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrMessagesService,
    private exchangeService: ExchangeService
  ) {
    this.groupForm()
    this.getNetworks()
  }

  getNetworks() {
    let array: any[] = [];
    this.exchangeService.fetchAll(Api_Endpoints.network.list, {}).subscribe(
      (response) => {
        Object.entries(response).forEach(item => {
          array.push(item[0])
        })
        this.networks.set(array)
      }
    )
  }

  submitForm() {
    if (this.form.valid) {
      if (!this.file) {
        this.toast.showError('لطفا فایل اکسل را انتخاب کنید.')
      } else {
        const formData = new FormData()
        formData.append('network', this.form.get('network')?.value)
        if (this.file)
          formData.append('file', this.file)

        this.exchangeService.addNetworkAddress(Api_Endpoints.network.addNetworkAddress, formData).subscribe(
          (response) => {
            console.log(response)
          }
        )
      }
    }

  }

  setFile($event: any) {
    if ($event.target.value.indexOf('csv') > 0 || $event.target.value.indexOf('xls') > 0) {
      this.selectedFile = $event.target.value
      let files: FileList = $event.target.files;
      this.file = files[0]
    } else {
      this.toast.showError('فرمت فایل باید اکسل باشد.')
    }
  }

  groupForm() {
    this.form = this.formBuilder.group({
      network: ['', Validators.required],
      file: [],
    })
  }
}

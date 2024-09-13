import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PriceReferenceService } from 'src/app/core/Services/Feature Services/price-reference.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  constructor(
    private priceReferenceService:PriceReferenceService
  ){}

  loading = signal<boolean>(false)

  isAutomated!: boolean
  usdPrice!: number

  formGroup: FormGroup | undefined;

  ngOnInit() {
    this.getUsdPrice()

      this.formGroup = new FormGroup({
          status: new FormControl<boolean | null>(this.isAutomated),
          price: new FormControl<number | null>(this.usdPrice)
      });

  }

  getUsdPrice(){
    this.loading.set(true)
    this.priceReferenceService.getAutomationModeSetting().subscribe(price => {
      this.isAutomated = price.automation_mode
      this.usdPrice = price.price
      this.formGroup!.setValue({
        status: price.automation_mode,
        price: price.price
      });
    }).add(() => {
    this.loading.set(false)
    })
  }

  updateUsdPrice(){
    this.loading.set(true)
    const a = {
      status: this.isAutomated ? 1 : 0,
      price: this.usdPrice.toString()
    };
    this.priceReferenceService.updateAutomationModeSetting(a).subscribe(setting => {
      this.getUsdPrice()
    }).add(() => {
      this.loading.set(false)
    })
  }


}

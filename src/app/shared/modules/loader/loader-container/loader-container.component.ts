import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader-container',
  templateUrl: './loader-container.component.html',
  styleUrls: ['./loader-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderContainerComponent {
  constructor() {}
}

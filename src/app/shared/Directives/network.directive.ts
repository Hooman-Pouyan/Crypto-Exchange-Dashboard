import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appNetwork]'
})
export class NetworkDirective {

  constructor() {
  }

  @Input() networkId: string = ''
  @Output() selectedNetwork = new EventEmitter<string>()

  @HostListener("click", ["$event"]) onClick() {
    console.log(this.networkId)
    this.selectedNetwork.emit(this.networkId)
  }
}

import { Directive, ElementRef, HostListener, Input, Renderer2, signal } from '@angular/core';
import { MenuService } from 'src/app/core/Services/Shared Services/menu.service';

@Directive({
  selector: '[appSideMenuOverToggle]'
})
export class SideMenuOverToggleDirective {

  isMenuActive = signal<boolean>(true)

  @Input("isSideMenuActive") set isSideMenuActive(value: boolean) {
    this.isMenuActive.set(value)
  }

  constructor(
    private el:ElementRef,
    private renderer:Renderer2,
    private menuservice:MenuService
  ) { }

  @HostListener("mouseenter", ["$event"]) onMouseEnter() {
    if (this.isMenuActive()) this.menuservice.sideMenuOpen.set(false)
    // this.renderer.setStyle(this.el.nativeElement, "display", "none !important")
  }

  @HostListener("mouseleave", ["$event"]) onMouseLeave() {
    this.menuservice.sideMenuOpen.set(true)
    // this.renderer.setStyle(this.el.nativeElement, "display", "none !important")
  }

}

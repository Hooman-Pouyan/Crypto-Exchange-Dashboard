import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { SidemenuModule} from './sidemenu/sidemenu.module';


@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderModule, FooterModule, SidemenuModule],
  exports: [HeaderModule, FooterModule, SidemenuModule],
})
export class LayoutModule {}

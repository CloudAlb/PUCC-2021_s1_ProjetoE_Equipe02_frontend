import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';

import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';

@NgModule({
  declarations: [MenuLateralComponent],
  imports: [IonicModule, CommonModule, RouterModule],
  exports: [MenuLateralComponent]
})
export class ComponentsModule {
}

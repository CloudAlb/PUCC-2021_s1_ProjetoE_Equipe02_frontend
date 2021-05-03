import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserColocationsPageRoutingModule } from './user-colocations-routing.module';

import { UserColocationsPage } from './user-colocations.page';
import { CardColocationComponent } from 'src/app/components/card-colocation/card-colocation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserColocationsPageRoutingModule
  ],
  declarations: [UserColocationsPage, CardColocationComponent]
})
export class UserColocationsPageModule {}

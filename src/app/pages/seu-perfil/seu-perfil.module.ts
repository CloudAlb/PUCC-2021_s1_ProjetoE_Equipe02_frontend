import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeuPerfilPageRoutingModule } from './seu-perfil-routing.module';

import { SeuPerfilPage } from './seu-perfil.page';
import { SocialCardComponent } from 'src/app/components/social-card/social-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeuPerfilPageRoutingModule,
  ],
  declarations: [SeuPerfilPage, SocialCardComponent]
})
export class SeuPerfilPageModule {}

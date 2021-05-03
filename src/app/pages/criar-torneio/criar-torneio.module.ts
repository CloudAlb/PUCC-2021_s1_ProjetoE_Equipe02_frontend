import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarTorneioPageRoutingModule } from './criar-torneio-routing.module';

import { CriarTorneioPage } from './criar-torneio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarTorneioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CriarTorneioPage]
})
export class CriarTorneioPageModule {}

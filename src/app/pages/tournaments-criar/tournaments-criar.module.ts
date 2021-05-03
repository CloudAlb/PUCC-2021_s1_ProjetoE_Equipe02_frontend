import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsCriarPageRoutingModule } from './tournaments-criar-routing.module';

import { TournamentsCriarPage } from './tournaments-criar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsCriarPageRoutingModule
  ],
  declarations: [TournamentsCriarPage]
})
export class TournamentsCriarPageModule {}

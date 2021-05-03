import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsParticipandoPageRoutingModule } from './tournaments-participando-routing.module';

import { TournamentsParticipandoPage } from './tournaments-participando.page';
import { CardTournamentComponent } from 'src/app/components/card-tournament/card-tournament.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsParticipandoPageRoutingModule
  ],
  declarations: [TournamentsParticipandoPage, CardTournamentComponent]
})
export class TournamentsParticipandoPageModule {}

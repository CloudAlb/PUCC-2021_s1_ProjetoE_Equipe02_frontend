import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsSeusPageRoutingModule } from './tournaments-seus-routing.module';

import { TournamentsSeusPage } from './tournaments-seus.page';
import { CardTournamentButtonComponent } from 'src/app/components/card-tournament-with-button/card-tournament-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsSeusPageRoutingModule,
  ],
  declarations: [TournamentsSeusPage, CardTournamentButtonComponent]
})
export class TournamentsSeusPageModule {}

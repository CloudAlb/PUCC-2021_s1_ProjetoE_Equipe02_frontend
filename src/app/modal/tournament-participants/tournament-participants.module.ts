import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentParticipantsPageRoutingModule } from './tournament-participants-routing.module';

import { TournamentParticipantsPage } from './tournament-participants.page';
import { CardTournamentParticipantComponent } from 'src/app/components/card-tournament-participant/card-tournament-participant.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentParticipantsPageRoutingModule
  ],
  declarations: [TournamentParticipantsPage, CardTournamentParticipantComponent]
})
export class TournamentParticipantsPageModule {}

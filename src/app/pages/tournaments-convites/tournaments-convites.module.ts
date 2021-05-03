import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsConvitesPageRoutingModule } from './tournaments-convites-routing.module';

import { TournamentsConvitesPage } from './tournaments-convites.page';
import { CardTournamentInviteComponent } from 'src/app/components/card-tournament-invite/card-tournament-invite.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsConvitesPageRoutingModule,
  ],
  declarations: [TournamentsConvitesPage, CardTournamentInviteComponent],
})
export class TournamentsConvitesPageModule {}

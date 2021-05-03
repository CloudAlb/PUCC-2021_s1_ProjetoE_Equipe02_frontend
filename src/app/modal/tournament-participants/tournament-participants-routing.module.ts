import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentParticipantsPage } from './tournament-participants.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentParticipantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentParticipantsPageRoutingModule {}

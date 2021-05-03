import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteParticipantsPage } from './invite-participants.page';

const routes: Routes = [
  {
    path: '',
    component: InviteParticipantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InviteParticipantsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentsParticipandoPage } from './tournaments-participando.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentsParticipandoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsParticipandoPageRoutingModule {}

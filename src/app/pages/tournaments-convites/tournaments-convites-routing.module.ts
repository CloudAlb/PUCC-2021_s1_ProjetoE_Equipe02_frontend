import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentsConvitesPage } from './tournaments-convites.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentsConvitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsConvitesPageRoutingModule {}

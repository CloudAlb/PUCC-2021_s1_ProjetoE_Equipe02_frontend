import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentsSeusPage } from './tournaments-seus.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentsSeusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsSeusPageRoutingModule {}

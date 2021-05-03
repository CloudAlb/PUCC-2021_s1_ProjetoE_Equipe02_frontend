import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentHomePage } from './tournament-home.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentHomePageRoutingModule {}

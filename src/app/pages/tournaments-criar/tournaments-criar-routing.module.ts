import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentsCriarPage } from './tournaments-criar.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentsCriarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsCriarPageRoutingModule {}

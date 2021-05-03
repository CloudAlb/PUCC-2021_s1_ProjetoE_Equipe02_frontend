import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserColocationsPage } from './user-colocations.page';

const routes: Routes = [
  {
    path: '',
    component: UserColocationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserColocationsPageRoutingModule {}

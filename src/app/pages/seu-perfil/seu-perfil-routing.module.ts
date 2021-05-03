import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeuPerfilPage } from './seu-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: SeuPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeuPerfilPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentHomePageRoutingModule } from './tournament-home-routing.module';

import { TournamentHomePage } from './tournament-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentHomePageRoutingModule
  ],
  declarations: [TournamentHomePage]
})
export class TournamentHomePageModule {}

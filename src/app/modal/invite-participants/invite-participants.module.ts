import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InviteParticipantsPageRoutingModule } from './invite-participants-routing.module';

import { InviteParticipantsPage } from './invite-participants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InviteParticipantsPageRoutingModule
  ],
  declarations: [InviteParticipantsPage]
})
export class InviteParticipantsPageModule {}

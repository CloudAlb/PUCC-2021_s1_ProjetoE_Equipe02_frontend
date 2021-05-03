import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface UserData {
  id_user: string;
  name: string;
  username: string;
  avatar_image: string;
}

@Component({
  selector: 'app-tournament-participants',
  templateUrl: './tournament-participants.page.html',
  styleUrls: ['./tournament-participants.page.scss'],
})
export class TournamentParticipantsPage implements OnInit {
  @Input() participants: UserData[];
  @Input() id_tournament: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}

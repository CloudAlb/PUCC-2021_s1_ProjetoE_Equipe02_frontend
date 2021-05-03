import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IonToastService } from 'src/app/services/ion-toast.service';
import { UsersService } from 'src/app/services/users.service';

interface Colocations {
  tournament_id: string;
  tournament_name: string;
  tournament_game: string;
  tournament_description: string;
  colocation: 'participant' | 'semifinalist' | 'winner';
}
/*
  @Input() tournament_id: string;
  @Input() tournament_name: string;
  @Input() tournament_game: string;
  @Input() tournament_description: string;
  @Input() colocation: 'participant' | 'semifinalist' | 'winner';
*/
@Component({
  selector: 'app-user-colocations',
  templateUrl: './user-colocations.page.html',
  styleUrls: ['./user-colocations.page.scss'],
})
export class UserColocationsPage implements OnInit {
  @Input() id_user: string;
  @Input() name: string;

  userColocations: Colocations[] = [];
  colocationsQuantity = 0;

  constructor(
    private modalController: ModalController,
    private usersService: UsersService,
    private ionToastService: IonToastService
  ) {}

  ngOnInit() {
    this.getUserColocations();
  }

  getUserColocations() {
    this.usersService
      .getColocations(this.id_user)
      .subscribe(async (response) => {
        if (response.status == 'error') {
          return;
        }

        if (response.data.length == 0) {
        }

        this.userColocations = response.data;
        this.colocationsQuantity = response.data.length;
      });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

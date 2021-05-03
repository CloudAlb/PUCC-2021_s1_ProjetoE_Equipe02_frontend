import { Component, Input, OnInit } from '@angular/core';
import { IonAlertService } from 'src/app/services/ion-alert.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-card-tournament-participant',
  templateUrl: './card-tournament-participant.component.html',
  styleUrls: ['./card-tournament-participant.component.scss'],
})
export class CardTournamentParticipantComponent implements OnInit {
  @Input() id_tournament: string;

  @Input() id_user: string;
  @Input() name: string;
  @Input() username: string;
  @Input() avatar_image: string;

  flagUserKicked: boolean = false;

  constructor(
    private tournamentService: TournamentsService,
    private ionAlertService: IonAlertService,
    private ionToastService: IonToastService
  ) {}

  ngOnInit() {
    this.checkUserIsKicked();
  }

  checkUserIsKicked() {
    this.tournamentService
      .isParticipantKicked(this.id_user, this.id_tournament)
      .subscribe(async (response) => {
        if (response.status == 'error') {
          await this.ionToastService.presentToast(
            'An error has occured.',
            'bottom'
          );

          return;
        }

        if (response.message == true) {
          this.flagUserKicked = true;
        }
      });
  }

  async showKickParticipantAlert() {
    await this.ionAlertService.presentAlertMultipleButtons(
      'Deseja kickar o usuário ' + this.name + 'do seu torneio?',
      'Essa ação não pode ser desfeita!',
      [
        {
          text: 'Sim',
          handler: () => {
            this.kickParticipant();
          },
        },
        {
          text: 'Não',
          role: 'cancel',
        },
      ]
    );
  }

  kickParticipant() {
    this.tournamentService
      .kickParticipant(this.id_user, this.id_tournament)
      .subscribe(async (response) => {
        if (response.status == 'error') {
          await this.ionToastService.presentToast(response.message, 'bottom');

          return;
        }

        await this.ionToastService.presentToast(
          'Usuário foi kickado do torneio.',
          'bottom'
        );

        this.flagUserKicked = true;
      });
  }
}

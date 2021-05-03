import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonAlertService } from 'src/app/services/ion-alert.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-card-tournament-invite',
  templateUrl: './card-tournament-invite.component.html',
  styleUrls: ['./card-tournament-invite.component.scss'],
})
export class CardTournamentInviteComponent implements OnInit {
  @Input('id_tournament') id_tournament: string;
  @Input('name') name: string;
  @Input('game') game: string;
  @Input('description') description: string;
  @Input('hasPassword') hasPassword: boolean;

  @Output() invitesUpdatedEvent = new EventEmitter<null>();

  constructor(
    private ionAlertService: IonAlertService,
    private ionToastService: IonToastService,
    private tournamentsService: TournamentsService
  ) {}

  ngOnInit() {}

  async showAcceptInviteAlert() {
    await this.ionAlertService.presentAlertMultipleButtons(
      "Aceitar convite do torneio '" + this.name + "'?",
      '',
      [
        {
          text: 'Sim',
          handler: () => {
            this.acceptInvite();
          },
        },
        {
          text: 'Não',
          role: 'cancel',
        },
      ]
    );
  }

  acceptInvite() {
    this.tournamentsService
      .acceptTournamentInvite(this.id_tournament)
      .subscribe(async (response) => {
        if (response.error) {
          await this.ionToastService.presentToast(
            'Houve um erro ao aceitar o convite.'
          );
          return;
        }

        await this.ionToastService.presentToast('Convite do torneio aceito!');
        this.invitesUpdatedEvent.emit();
      });
  }

  async showRefuseInviteAlert() {
    await this.ionAlertService.presentAlertMultipleButtons(
      "Recusar convite do torneio '" + this.name + "'?",
      '',
      [
        {
          text: 'Sim',
          handler: () => {
            this.refuseInvite();
          },
        },
        {
          text: 'Não',
          role: 'cancel',
        },
      ]
    );
  }

  refuseInvite() {
    this.tournamentsService
      .refuseTournamentInvite(this.id_tournament)
      .subscribe(async (response) => {
        if (response.error) {
          await this.ionToastService.presentToast(
            'Houve um erro ao recusar o convite.'
          );
          return;
        }

        await this.ionToastService.presentToast('Convite do torneio recusado!');
        this.invitesUpdatedEvent.emit();
      });
  }
}

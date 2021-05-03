import { Component, Input, OnInit } from '@angular/core';

import { HomeService } from 'src/app/services/home.service';
import { IonToastService } from 'src/app/services/ion-toast.service';

@Component({
  selector: 'app-card-tournament-button',
  templateUrl: './card-tournament-button.component.html',
  styleUrls: ['./card-tournament-button.component.scss'],
})
export class CardTournamentButtonComponent implements OnInit {
  @Input('id_tournament') id_tournament: string;
  @Input('name') name: string;
  @Input('game') game: string;
  @Input('description') description: string;
  @Input('hasPassword') hasPassword: boolean;

  constructor(
    public homeService: HomeService,
    private ionToastService: IonToastService
  ) {}

  ngOnInit() {}

  publishPublication(id_tournament: string) {
    console.log(id_tournament);
    this.homeService
      .postPublication({ id_tournament })
      .subscribe(async (response) => {
        if (response.error) {
          await this.ionToastService.presentToast(response.error, 'bottom');
          return;
        }

        await this.ionToastService.presentToast(response.message, 'bottom');
      });
  }
}

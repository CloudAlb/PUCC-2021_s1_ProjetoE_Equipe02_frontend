import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-tournaments-criar',
  templateUrl: './tournaments-criar.page.html',
  styleUrls: ['./tournaments-criar.page.scss'],
})
export class TournamentsCriarPage implements OnInit {
  name: string;
  game: string;
  description: string;
  password: string;
  number_participants = 4;

  constructor(
    private tournamentService: TournamentsService,
    private ionToastService: IonToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  isStringEmpty(element: string) {
    if (element == '') return true;
    if (element == undefined) return true;
    if (element == null) return true;

    return false;
  }

  async criarTournament() {
    if (
      this.isStringEmpty(this.name) ||
      this.isStringEmpty(this.game) ||
      this.isStringEmpty(this.description)
    ) {
      await this.ionToastService.presentToast(
        'Aviso: ainda há campos vazios!',
        'bottom'
      );

      return;
    }

    this.tournamentService
      .postTournament({
        name: this.name,
        game: this.game,
        description: this.description,
        password: this.password,
        number_participants: this.number_participants,
      })
      .subscribe(async (response) => {
        if (response.message) {
          this.ionToastService.presentToast(response.error, 'middle');
        }

        await this.ionToastService.presentToast(response.message, 'middle');

        this.router
          .navigate(['/tournaments-seus'], { relativeTo: this.route.parent })
          .then(() => {});
      });
  }
}

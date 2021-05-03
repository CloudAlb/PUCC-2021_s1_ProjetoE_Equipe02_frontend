import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-tournaments-participando',
  templateUrl: './tournaments-participando.page.html',
  styleUrls: ['./tournaments-participando.page.scss'],
})
export class TournamentsParticipandoPage implements OnInit {
  tournaments = [];

  constructor(private tournamentsService: TournamentsService) {}

  ngOnInit() {
    this.loadUserTournaments();
  }

  loadUserTournaments() {
    this.tournamentsService
      .getTournamentsUserIsParticipating()
      .subscribe((response) => {
        this.tournaments = response.data;
      });
  }
}

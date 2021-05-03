import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-tournaments-seus',
  templateUrl: './tournaments-seus.page.html',
  styleUrls: ['./tournaments-seus.page.scss'],
})
export class TournamentsSeusPage implements OnInit {
  tournaments = [];

  constructor(private tournamentsService: TournamentsService) {}

  ngOnInit() {
    this.loadUserTournaments();
  }

  loadUserTournaments() {
    this.tournamentsService.getUserTournaments().subscribe((response) => {
      this.tournaments = response.data;
    });
  }
}

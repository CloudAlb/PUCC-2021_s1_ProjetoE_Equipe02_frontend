import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-tournament',
  templateUrl: './card-tournament.component.html',
  styleUrls: ['./card-tournament.component.scss'],
})
export class CardTournamentComponent implements OnInit {
  @Input('id_tournament') id_tournament: string;
  @Input('name') name: string;
  @Input('game') game: string;
  @Input('description') description: string;
  @Input('hasPassword') hasPassword: boolean;

  constructor() { }

  ngOnInit() {}

}

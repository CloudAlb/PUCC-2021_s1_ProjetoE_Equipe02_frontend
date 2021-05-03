import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-colocation',
  templateUrl: './card-colocation.component.html',
  styleUrls: ['./card-colocation.component.scss'],
})
export class CardColocationComponent implements OnInit {
  @Input() tournament_id: string;
  @Input() tournament_name: string;
  @Input() tournament_game: string;
  @Input() tournament_description: string;
  @Input() colocation: 'participant' | 'semifinalist' | 'winner';

  constructor() {}

  ngOnInit() {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-seguidor',
  templateUrl: './card-seguidor.component.html',
  styleUrls: ['./card-seguidor.component.scss'],
})
export class CardSeguidorComponent implements OnInit {
  @Input() id_user: string;
  @Input() name: string;
  @Input() username: string;
  @Input() avatar_image: string;

  constructor() {}

  ngOnInit() {}
}

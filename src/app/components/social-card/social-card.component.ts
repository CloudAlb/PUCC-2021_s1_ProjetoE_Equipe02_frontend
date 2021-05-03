import { Component, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-card',
  templateUrl: './social-card.component.html',
  styleUrls: ['./social-card.component.scss'],
})
export class SocialCardComponent implements OnInit {
  @Input('social') social: string;
  @Input('username') username: string;

  constructor() { }

  ngOnInit() { }

}

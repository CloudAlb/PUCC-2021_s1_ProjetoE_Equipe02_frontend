import { Component, Input, NgModule, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {
  id_user: string;
  name: string;
  username: string;
  avatarPath: string;

  appPages = [];

  @Input('contentId') public contentId: string;
  @Input('side') public side: string;

  constructor(private sessionsService: SessionsService) {}

  ngOnInit() {
    this.id_user = '';
    this.name = '';
    this.username = '';
    this.avatarPath = 'assets/icons/defaultIcon.svg';

    this.loadUserInfo();

    this.appPages = [
      { title: 'Home', url: 'home', icon: 'home' },
      { title: 'Seu perfil', url: '/profile/' + this.id_user, icon: 'person' },
      { title: 'Seguidores', url: '/seguidores/' + this.id_user, icon: 'heart' },
      { title: 'Criar Torneio', url: 'tournaments-criar', icon: 'trophy' },
      { title: 'Torneios', url: 'tournament-home', icon: 'trophy' },
      { title: 'Loja', url: 'loja', icon: 'bag' },
      { title: 'Login', url: '/login', icon: 'add' },
      { title: 'Cadastro', url: '/cadastro', icon: 'add' },
      { title: 'Logout', url: '/logout', icon: 'log-out' },
    ];
  }

  loadUserInfo() {
    const {
      name,
      username,
      avatar_image,
      id_user,
    } = this.sessionsService.getUserData();

    this.id_user = id_user;
    this.name = name;
    this.username = username;
    if (avatar_image) this.avatarPath = avatar_image;
  }

  ionWillOpen() {
    this.loadUserInfo();
  }
}

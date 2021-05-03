import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserColocationsPage } from 'src/app/modal/user-colocations/user-colocations.page';

import { UserInfo } from 'src/app/models/user-info';
import { FollowService } from 'src/app/services/follow.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

import { SeuPerfilService } from 'src/app/services/seu-perfil.service';

@Component({
  selector: 'app-seu-perfil',
  templateUrl: './seu-perfil.page.html',
  styleUrls: ['./seu-perfil.page.scss'],
})
export class SeuPerfilPage implements OnInit {
  backgroundPath = 'assets/backgrounds/defaultBackground.jpg';
  avatarPath = 'assets/icons/defaultIcon.svg';

  Telegram = 'assets/icons/logo-telegram.svg';
  Facebook = 'assets/icons/logo-facebook.svg';
  Twitter = 'assets/icons/logo-twitter.svg';
  Twitch = 'assets/icons/logo-twitch.svg';

  user: UserInfo = {};
  socials: [{}] = [{}];

  loggedInUser = '';

  editarPerfilLink = '';
  colocationsLink = '';

  flagIsOwnUser = false;
  flagUserIsFollowing = false;

  constructor(
    public seuPerfilService: SeuPerfilService,
    public localStorageService: LocalStorageService,
    public sessionManagerService: SessionManagerService,
    public ionToastService: IonToastService,
    public followService: FollowService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.socials.shift();

    this.user = {
      data: {
        id_user: '',
        name: '',
        username: '',
        email: '',
        birth_date: '',
        avatarImage: '',
        backgroundImage: '',
        bio: '',
        level: '',
        coins: '',
        followers: '',
      },
    };

    const { id_user } = this.localStorageService.getUserInfo();
    this.loggedInUser = id_user;

    this.user.data.id_user = this.route.snapshot.paramMap.get('id');
    this.editarPerfilLink = '/editar-perfil/' + this.user.data.id_user;

    this.checkIfFollowingUser();

    this.loadUserInfo();
    this.loadUserSocialInfo();
  }

  checkIfFollowingUser() {
    this.followService
      .checkIfUserIsFollowing(this.user.data.id_user)
      .subscribe(async (response) => {
        if (response.status == 'error') {
          await this.ionToastService.presentToast('Houve um erro.', 'middle');
        }

        if (response.data == true)
          // if user is following
          this.flagUserIsFollowing = true;
      });
  }

  followUser() {
    this.followService
      .followUser(this.user.data.id_user)
      .subscribe(async (response) => {
        if (response.status == 'error') {
          this.ionToastService.presentToast(
            'Houve um erro ao seguir esse usuário.',
            'middle'
          );
        }

        await this.ionToastService.presentToast(
          'Você está seguindo ' + this.user.data.name,
          'middle'
        );

        this.flagUserIsFollowing = true;
      });
  }

  unfollowUser() {
    this.followService
      .unfollowUser(this.user.data.id_user)
      .subscribe(async (response) => {
        if (response.status == 'error') {
          this.ionToastService.presentToast(
            'Houve um erro ao deixar de seguir esse usuário.',
            'middle'
          );
        }

        await this.ionToastService.presentToast(
          'Você deixou de seguir ' + this.user.data.name,
          'middle'
        );

        this.flagUserIsFollowing = false;
      });
  }

  loadUserInfo() {
    this.seuPerfilService
      .getUser(this.user.data.id_user)
      .subscribe((response) => {
        if (!response.data) return;

        this.user = response;

        // logged user id
        if (this.user.data.id_user == this.loggedInUser)
          this.flagIsOwnUser = true;

        if (response.data.avatarImage)
          this.backgroundPath = response.data.avatarImage;
        if (response.data.backgroundImage)
          this.backgroundPath = response.data.backgroundImage;
      });
  }

  loadUserSocialInfo() {
    this.seuPerfilService
      .getUserSocial(this.user.data.id_user)
      .subscribe((response) => {
        if (!response.data) return;

        if (response.data.telegram)
          this.socials.push({
            social: this.Telegram,
            username: response.data.telegram,
          });
        if (response.data.facebook)
          this.socials.push({
            social: this.Facebook,
            username: response.data.facebook,
          });
        if (response.data.twitter)
          this.socials.push({
            social: this.Twitter,
            username: response.data.twitter,
          });
        if (response.data.twitch)
          this.socials.push({
            social: this.Twitch,
            username: response.data.twitch,
          });
      });
  }

  async showColocationsModal() {
    const modal = await this.modalController.create({
      component: UserColocationsPage,
      componentProps: {
        id_user: this.user.data.id_user,
        name: this.user.data.name,
      },
    });

    await modal.present();

    // await modal.onDidDismiss();
  }

  ionViewWillEnter() {
    this.loadUserInfo();
  }
}

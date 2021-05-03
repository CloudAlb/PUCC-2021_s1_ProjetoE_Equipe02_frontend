import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonAlertService } from 'src/app/services/ion-alert.service';
import { SeuPerfilService } from 'src/app/services/seu-perfil.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  id_user: string;

  private logoTelegram = 'assets/icons/logo-telegram.svg';
  private logoFacebook = 'assets/icons/logo-facebook.svg';
  private logoTwitter = 'assets/icons/logo-twitter.svg';
  private logoTwitch = 'assets/icons/logo-twitch.svg';

  private alterPasswordShown = false;
  private buttonAlterPasswordShownText = 'Mostrar';

  private placeholder = '...';
  private placeholder_bio = '...';

  private name = '';
  private username = '';
  private bio = '';
  private email = '';
  private birth_date = '';

  private telegram = '';
  private facebook = '';
  private twitter = '';
  private twitch = '';

  private password_old = '';
  private password_new = '';
  private password_confirm = '';

  private placeholder_telegram = '';
  private placeholder_facebook = '';
  private placeholder_twitter = '';
  private placeholder_twitch = '';

  public maxDate = '';

  constructor(
    private seuPerfilService: SeuPerfilService,
    private ionToastService: IonToastService,
    private ionAlertService: IonAlertService,
    private route: ActivatedRoute
  ) {
    this.maxDate = this.getTodayDate();
  }

  ngOnInit() {
    this.id_user = this.route.snapshot.paramMap.get('id');

    this.loadUserEditInfo();
    this.loadUserSocialEditInfo();
  }

  loadUserEditInfo() {
    this.seuPerfilService.getUser(this.id_user).subscribe((response) => {
      if (!response.data) return;

      this.placeholder = '';
      this.placeholder_bio = 'Digite algo aqui...';

      this.name = response.data.name;
      this.username = response.data.username;
      if (response.data.bio) this.bio = response.data.bio;
      this.email = response.data.email;
      this.birth_date = response.data.birth_date;
    });
  }

  loadUserSocialEditInfo() {
    this.seuPerfilService.getUserSocial(this.id_user).subscribe((response) => {
      if (response.data.telegram) {
        this.placeholder_telegram = 'Sair como ' + response.data.telegram;
        this.telegram = response.data.telegram;
      } else this.placeholder_telegram = 'Entrar com Telegram';

      if (response.data.facebook) {
        this.placeholder_facebook = 'Sair como ' + response.data.facebook;
        this.facebook = response.data.facebook;
      } else this.placeholder_facebook = 'Entrar com Facebook';

      if (response.data.twitter) {
        this.placeholder_twitter = 'Sair como ' + response.data.twitter;
        this.twitter = response.data.twitter;
      } else this.placeholder_twitter = 'Entrar com Twitter';

      if (response.data.twitch) {
        this.placeholder_twitch = 'Sair como ' + response.data.twitch;
        this.twitch = response.data.twitch;
      } else this.placeholder_twitch = 'Entrar com Twitch';
    });
  }

  async editUserInfo() {
    this.ionAlertService.presentAlertMultipleButtons(
      'Aviso',
      'Confirmar alterações?',
      [
        {
          text: 'Sim',
          handler: () => {
            this.seuPerfilService
              .editUser({
                name: this.name,
                username: this.username,
                bio: this.bio,
                email: this.email,
                birth_date: this.birth_date,
              })
              .subscribe(async (data) => {
                await this.ionToastService.presentToast(data.message);
              });
          },
        },
        {
          text: 'Não',
          role: 'cancel',
        },
      ]
    );
  }

  async editUserSocialInfo(social_network: string, username: string) {
    if (username) {
      // se está logado e quer alterar ou apagar
      this.ionAlertService.presentAlertPrompt(
        'Alterar contato do ' + social_network,
        [
          {
            name: 'username',
            value: username,
            type: 'text',
          },
        ],
        [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Confirmar',
            handler: async (alertData) => {
              // programação para alterar a social_network específica
              switch (social_network) {
                case 'Telegram':
                  this.seuPerfilService
                    .editUserSocialInfo({
                      social_network: 'telegram',
                      username: alertData.username,
                    })
                    .subscribe(async (data) => {
                      await this.ionToastService.presentToast(data.message);
                    });
                  break;
                case 'Facebook':
                  this.seuPerfilService
                    .editUserSocialInfo({
                      social_network: 'facebook',
                      username: alertData.username,
                    })
                    .subscribe(async (data) => {
                      await this.ionToastService.presentToast(data.message);
                    });
                  break;
                case 'Twitter':
                  this.seuPerfilService
                    .editUserSocialInfo({
                      social_network: 'twitter',
                      username: alertData.username,
                    })
                    .subscribe(async (data) => {
                      await this.ionToastService.presentToast(data.message);
                    });
                  break;
                case 'Twitch':
                  this.seuPerfilService
                    .editUserSocialInfo({
                      social_network: 'twitch',
                      username: alertData.username,
                    })
                    .subscribe(async (data) => {
                      await this.ionToastService.presentToast(data.message);
                    });
                  break;
                default:
                  await this.ionToastService.presentToast('Houve um erro.');
                  break;
              }
            },
          },
        ],
        '(Deixe vazio para limpar)'
      );
    } else {
      // se NÃO está logado e quer informar uma rede social
      this.ionAlertService.presentAlertPrompt(
        'Logar com ' + social_network,
        [
          {
            name: 'username',
            type: 'text',
          },
        ],
        [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Confirmar',
            handler: async (alertData) => {
              // programação para alterar a social específica
              switch (social_network) {
                case 'Telegram':
                  this.seuPerfilService
                    .editUserSocialInfo({
                      social_network: 'telegram',
                      username: alertData.username,
                    })
                    .subscribe(async (data) => {
                      await this.ionToastService.presentToast(data.message);
                    });
                  break;
                case 'Facebook':
                  this.seuPerfilService
                    .editUserSocialInfo({
                      social_network: 'facebook',
                      username: alertData.username,
                    })
                    .subscribe(async (data) => {
                      await this.ionToastService.presentToast(data.message);
                    });
                  break;
                case 'Twitter':
                  this.seuPerfilService
                    .editUserSocialInfo({
                      social_network: 'twitter',
                      username: alertData.username,
                    })
                    .subscribe(async (data) => {
                      await this.ionToastService.presentToast(data.message);
                    });
                  break;
                case 'Twitch':
                  this.seuPerfilService
                    .editUserSocialInfo({
                      social_network: 'twitch',
                      username: alertData.username,
                    })
                    .subscribe(async (data) => {
                      await this.ionToastService.presentToast(data.message);
                    });
                  break;
                default:
                  await this.ionToastService.presentToast('Houve um erro.');
              }
            },
          },
        ]
      );
    }
  }

  async editPassword() {
    if (
      this.password_old == '' ||
      this.password_new == '' ||
      this.password_confirm == ''
    ) {
      await this.ionToastService.presentToast(
        'Por favor, informe todos os campos de senha.',
        'middle'
      );
      return;
    }

    if (this.password_new != this.password_confirm) {
      await this.ionToastService.presentToast(
        '"Senha nova" e "Confirme nova senha" diferem.',
        'middle'
      );
      return;
    }

    await this.ionAlertService.presentAlertMultipleButtons(
      'Aviso',
      'Confirmar alteração de senha?',
      [
        {
          text: 'Sim',
          handler: async () => {
            this.seuPerfilService
              .editPassword({
                password_old: this.password_old,
                password_new: this.password_new,
              })
              .subscribe(async (data) => {
                await this.ionToastService.presentToast(data.message);
              });
          },
        },
        {
          text: 'Não',
          role: 'cancel',
        },
      ]
    );
  }

  hideChangePasswordModule() {
    this.alterPasswordShown = !this.alterPasswordShown;

    if (this.alterPasswordShown) this.buttonAlterPasswordShownText = 'Esconder';
    else this.buttonAlterPasswordShownText = 'Alterar';
  }

  private getTodayDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
}

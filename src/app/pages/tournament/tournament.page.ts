import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { interval } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { ModalController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { InviteParticipantsPage } from 'src/app/modal/invite-participants/invite-participants.page';
import { IonAlertService } from 'src/app/services/ion-alert.service';

import { IonToastService } from 'src/app/services/ion-toast.service';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';
import { TournamentParticipantsPage } from 'src/app/modal/tournament-participants/tournament-participants.page';

interface UserData {
  id_user: string;
  name: string;
  username: string;
  avatar_image: string;
}

interface TournamentInfo {
  id_tournament: string;
  name: string;
  game: string;
  description: string;
  number_participants: number;
  user: {
    id_user: string;
    name: string;
    username: string;
    avatar_image: string;
  };
}

// TODO, componentizar essa interface
// pois ela está sendo usada em:
// - tournament.page.ts
// - tournaments.service.ts
// - e aqui
interface UserParticipant {
  id_user: string;
  name: string;
  username: string;
  avatar_image: string;
}

interface bracketsObject {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  s1: string;
  s2: string;
  w: string;
}

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss'],
})
export class TournamentPage implements OnInit {
  tournamentInfo: TournamentInfo;

  userIsTournamentOwner = false;

  // brackets attributes
  flagParticipantsChosen = false;
  flagSemifinalistsChosen = false;

  flagWinnerSelected = false;
  flagWinnerChosen = false;

  flagTournamentReadyToInitialize = false;
  flagTournamentInitialized = false;

  flagChangeWasMade = false;

  column1: string[] = [null, null, null, null];
  column2: string[] = [null, null];
  column3: string[] = [null];
  column4: string[] = [];

  brackets: bracketsObject;

  participantsArray: UserParticipant[] = [];
  selectableParticipantsNamesArray: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,

    private tournamentsService: TournamentsService,
    private ionToastService: IonToastService,
    private pickerController: PickerController,
    private ionAlertService: IonAlertService,
    private localStorageService: LocalStorageService,

    private usersService: UsersService
  ) {}

  ngOnInit() {
    // TODO, aparentemente preciso inicializar todos os atributos de um page.ts
    // para não dar erro (cannot read property name of undefined)

    this.tournamentInfo = {
      id_tournament: '',
      name: '',
      game: '',
      description: '',
      number_participants: 0,
      user: {
        id_user: '',
        name: '',
        username: '',
        avatar_image: '',
      },
    };

    this.brackets = {
      p1: '(Participante 1)',
      p2: '(Participante 2)',
      p3: '(Participante 3)',
      p4: '(Participante 4)',
      s1: '(Semifinalista 1)',
      s2: '(Semifinalista 2)',
      w: '(Vencedor)',
    };

    this.tournamentInfo.id_tournament = this.route.snapshot.paramMap.get('id');

    this.getTournamentInfo();
    this.getTournamentParticipants();
    this.loadTournamentColumns();
  }

  isStringEmpty(element: string) {
    if (element == '') return true;
    if (element == undefined) return true;
    if (element == null) return true;

    return false;
  }

  getTournamentInfo() {
    this.tournamentsService
      .getTournament(this.tournamentInfo.id_tournament)
      .subscribe((response) => {
        if (response.message) {
          // TODO, redirecionar para página de 404 NOT FOUND
        }

        this.tournamentInfo = response.data;
        this.ensureUserPermissions();
      });
  }

  getTournamentParticipants() {
    this.tournamentsService
      .getTournamentParticipants(this.tournamentInfo.id_tournament)
      .subscribe((response) => {
        if (response.message) {
          this.ionToastService.presentToast(response.message);
        }

        this.participantsArray = response.data;
      });
  }

  async createInviteParticipantsModal() {
    const { id_user } = this.localStorageService.getUserInfo();

    const modal = await this.modalController.create({
      component: InviteParticipantsPage,
      componentProps: {
        id_tournament: this.route.snapshot.paramMap.get('id'),
        logged_user_id: id_user,
      },
    });

    await modal.present();

    await modal.onDidDismiss();
    this.getTournamentParticipants();
  }

  // brackets methods
  async pickParticipant(bracket: string) {
    // p -> participant
    // s -> semifinalist
    // w -> winner

    // TODO, implementar "desinicializar o torneio"
    /*
    if (this.flagTournamentInitialized) {
      return;
    }
    */

    // verificando se o usuário é o dono do torneio
    if (!this.userIsTournamentOwner) return;

    // verificando se o vencedor já foi escolhido
    if (this.flagWinnerChosen) return;

    // verificando se posso escolher um vencedor
    if (
      !this.isStringEmpty(this.column2[0]) &&
      !this.isStringEmpty(this.column2[1])
    ) {
      this.flagSemifinalistsChosen = true;
    }

    // se estou tentando escolher participantes mesmo depois de inicializar um torneio
    if (this.flagTournamentInitialized && bracket.match('p[1-4]')) {
      return;
    }

    // se estou tentando escolher um semifinalista antes de escolher os participantes
    if (
      !this.flagTournamentInitialized &&
      (bracket.match('s[1-2]') || bracket == 'w')
    ) {
      if (this.flagTournamentReadyToInitialize) {
        await this.ionToastService.presentToast(
          'Você precisa inicializar o torneio antes de fazer isso!',
          'top'
        );

        return;
      }

      await this.ionToastService.presentToast(
        'Você precisa escolher todos os participantes antes de fazer isso!',
        'top'
      );
      return;
    }

    // se estou tentando escolher um vencedor antes de escolher os semifinalistas
    if (!this.flagSemifinalistsChosen && bracket == 'w') {
      await this.ionToastService.presentToast(
        'Você precisa escolher os semifinalistas antes de fazer isso!',
        'top'
      );
      return;
    }

    this.selectableParticipantsNamesArray = [];

    let tournamentKickedUsers: {
      id_user: string;
      name: string;
      username: string;
    }[];

    this.tournamentsService
      .getTournamentKickedParticipants(this.tournamentInfo.id_tournament)
      .subscribe(async (response) => {
        if (response.status == 'error') {
          return;
        }

        tournamentKickedUsers = response.data;

        let tournamentKickedUsersIds: String[] = [];

        tournamentKickedUsers.map((element) => {
          tournamentKickedUsersIds.push(element.id_user);
        });

        this.participantsArray = this.participantsArray.filter((element) => {
          if (tournamentKickedUsersIds.includes(element.id_user)) return false;

          return true;
        });

        // TODO, resto da função original
        if (bracket.match('p[1-4]')) {
          // cria um array com os participantes selecionáveis
          // somente para a coluna com os participantes
          const participantsNames = this.participantsArray.map(
            async (participant) => {
              return participant.name;
            }
          );

          const participantsNamesResolved = await Promise.all(
            participantsNames
          );

          for (let participant in participantsNamesResolved) {
            let flagParticipantIsInBracket = 0;

            for (let bracket in this.brackets) {
              // console.log(participantsNamesResolved[participant]);
              // console.log(this.brackets[bracket]);
              // console.log(
              //   participantsNamesResolved[participant] == this.brackets[bracket]
              // );

              if (
                participantsNamesResolved[participant] == this.brackets[bracket]
              )
                flagParticipantIsInBracket = 1;
            }

            if (flagParticipantIsInBracket == 0) {
              this.selectableParticipantsNamesArray.push(
                participantsNamesResolved[participant]
              );
            }
          }
        }

        if (this.flagParticipantsChosen) {
          if (bracket == 's1') {
            if (!this.column1[0].includes('kickado'))
              this.selectableParticipantsNamesArray.push(this.column1[0]);
            if (!this.column1[1].includes('kickado'))
              this.selectableParticipantsNamesArray.push(this.column1[1]);
          }

          if (bracket == 's2') {
            if (!this.column1[2].includes('kickado'))
              this.selectableParticipantsNamesArray.push(this.column1[2]);
            if (!this.column1[3].includes('kickado'))
              this.selectableParticipantsNamesArray.push(this.column1[3]);
          }
        }

        if (bracket == 'w' && this.flagSemifinalistsChosen) {
          if (!this.column2[0].includes('kickado'))
            this.selectableParticipantsNamesArray.push(this.column2[0]);
          if (!this.column2[1].includes('kickado'))
            this.selectableParticipantsNamesArray.push(this.column2[1]);
        }

        // se tudo isso resultou num vetor vazio
        // ou seja, não há quem escolher
        // não exibe nem processa nada
        // mas avisa que precisa convidar mais pessoas para preencher os brackets
        if (this.selectableParticipantsNamesArray.length == 0) {
          await this.ionToastService.presentToast(
            'Você precisa convidar mais pessoas para preencher as chaves do torneio!',
            'top'
          );
          return;
        }

        await this.showPicker(bracket, this.selectableParticipantsNamesArray);
      });
  }

  async showPicker(bracket: string, participantsNames: string[]) {
    let options: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Selecionar',
          handler: (value) => {
            this.setParticipantInBracket(
              bracket,
              value.selectedParticipant.value
            );

            // no momento que uma bracket é selecionada, habilitar o botão de salvar
            this.flagChangeWasMade = true;
          },
        },
      ],
      columns: [
        {
          name: 'selectedParticipant',
          options: this.getColumnOptions(participantsNames),
        },
      ],
    };
    let picker = await this.pickerController.create(options);
    await picker.present();
  }

  getColumnOptions(participantsNames: Array<string>) {
    let options = [];
    participantsNames.forEach((x) => {
      options.push({ text: x, value: x });
    });
    return options;
  }

  setParticipantInBracket(bracket: string, participant: string) {
    this.brackets[bracket] = participant;

    switch (bracket) {
      case 'p1':
        this.column1[0] = participant;
        break;
      case 'p2':
        this.column1[1] = participant;
        break;
      case 'p3':
        this.column1[2] = participant;
        break;
      case 'p4':
        this.column1[3] = participant;
        break;
      case 's1':
        this.column2[0] = participant;
        break;
      case 's2':
        this.column2[1] = participant;
        break;
      case 'w':
        this.column3[0] = participant;
        this.flagWinnerSelected = true;
        break;

      default:
        break;
    }

    this.checkIfBracketsAreFull();
  }

  checkIfBracketsAreFull() {
    // se aqui não houver participantes selecionáveis
    // habilitar o botão de inicializar torneio
    let flagArrayHasEmptyPosition = false;

    this.column1.forEach((element) => {
      if (this.isStringEmpty(element)) {
        flagArrayHasEmptyPosition = true;
        return;
      }
    });

    if (!flagArrayHasEmptyPosition && !this.flagTournamentInitialized) {
      this.flagTournamentReadyToInitialize = true;
    }
  }

  async showInitializeTournamentAlert() {
    await this.ionAlertService.presentAlertMultipleButtons(
      'Confirmar participantes do torneio?',
      'Você não poderá alterar mais os participantes depois disso!',
      [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: async () => {
            this.initializeTournament();
          },
        },
      ]
    );
  }

  async initializeTournament() {
    this.saveTournament();

    if (this.flagChangeWasMade) {
      // deu erro ao salvar no momento de inicializar o torneio
      // a função saveTournament() vai avisar isso
      return;
    }

    this.changeInitializedFlag(true);

    if (this.flagChangeWasMade) {
      return;
    }

    await this.ionToastService.presentToast('Torneio inicializado!', 'top');
    // desabilitar o botão de inicializar torneio
    this.flagTournamentReadyToInitialize = false;
    // habilitar a flag torneio iniciado
    this.flagTournamentInitialized = true;

    this.flagParticipantsChosen = true;
  }

  changeInitializedFlag(flag: boolean) {
    this.tournamentsService
      .updateTournamentFlagInitializedTournament(
        this.tournamentInfo.id_tournament,
        flag
      )
      .subscribe(async (response) => {
        if (response.error) {
          this.flagChangeWasMade = true;
          await this.ionToastService.presentToast(
            'Não foi possível inicializar o torneio.',
            'top'
          );
        }
      });
  }

  async showChooseWinnerAlert() {
    await this.ionAlertService.presentAlertMultipleButtons(
      'Escolher ' + this.column3[0] + ' como vencedor do torneio?',
      'Isso vai encerrar o seu torneio!',
      [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: async () => {
            this.chooseWinner();
          },
        },
      ]
    );
  }

  chooseWinner() {
    this.flagWinnerChosen = true;
    this.flagWinnerSelected = false;
    this.saveTournament();
    this.endTournament();
    this.giveUserCoins();
  }

  async showSaveTournamentAlert() {
    await this.ionAlertService.presentAlertMultipleButtons(
      'Deseja salvar o torneio?',
      '',
      [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: async () => {
            this.saveTournament();
          },
        },
      ]
    );
  }

  saveTournament() {
    this.tournamentsService
      .updateTournamentColumns(this.tournamentInfo.id_tournament, {
        column1: this.column1.toString(),
        column2: this.column2.toString(),
        column3: this.column3.toString(),
        column4: '',
      })
      .subscribe(async (response) => {
        if (response.error) {
          await this.ionToastService.presentToast(
            'Houve um erro ao salvar.',
            'top'
          );

          return;
        }

        await this.ionToastService.presentToast(
          'Torneio salvo com sucesso!',
          'top'
        );
      });

    this.flagChangeWasMade = false;
  }

  loadTournamentColumns() {
    this.tournamentsService
      .getTournamentColumns(this.tournamentInfo.id_tournament)
      .subscribe(async (response) => {
        if (!response.data) {
          await this.ionToastService.presentToast(
            'Houve um erro ao carregar o torneio.',
            'top'
          );

          return;
        }

        this.flagTournamentInitialized = response.data.tournament_initialized;

        if (this.flagTournamentInitialized) {
          this.flagParticipantsChosen = true;
        }

        if (response.data.column1) {
          this.column1 = response.data.column1.split(',');

          if (this.column1[0]) this.brackets.p1 = this.column1[0];
          if (this.column1[1]) this.brackets.p2 = this.column1[1];
          if (this.column1[2]) this.brackets.p3 = this.column1[2];
          if (this.column1[3]) this.brackets.p4 = this.column1[3];
        }

        if (response.data.column2) {
          this.column2 = response.data.column2.split(',');
          if (this.column2[0]) this.brackets.s1 = this.column2[0];
          if (this.column2[1]) this.brackets.s2 = this.column2[1];
        }

        if (response.data.column3) {
          this.column3 = response.data.column3.split(',');

          if (this.column3[0]) this.brackets.w = this.column3[0];
        }

        if (response.data.column4) {
          this.column4 = response.data.column4.split(',');
        }

        if (response.data.tournament_ended) {
          this.flagParticipantsChosen = true;
          this.flagSemifinalistsChosen = true;
          this.flagTournamentInitialized = true;
          this.flagWinnerChosen = true;

          return;
        }

        // para habilitar os botões de inicializar torneio
        // então, se o torneio já foi inicializado, não precisa ser executado
        if (!this.flagTournamentInitialized) {
          this.checkIfBracketsAreFull();
        }

        if (
          !this.isStringEmpty(this.column2[0]) &&
          !this.isStringEmpty(this.column2[1])
        ) {
          this.flagSemifinalistsChosen = true;
        }

        // TODO, não deu pra fazer no ngOnInit, então fiz aqui.
        this.adjustBracketsAfterKickedUser();
      });
  }

  ensureUserPermissions() {
    const { id_user } = this.localStorageService.getUserInfo();

    if (this.tournamentInfo.user.id_user == id_user) {
      this.userIsTournamentOwner = true;

      const source = interval(1000);
      source.subscribe(() => {
        this.getTournamentParticipants();
      });
    } else {
      const source = interval(1000);
      source.subscribe(() => {
        this.loadTournamentColumns();
      });
    }
  }

  giveUserCoins() {
    this.tournamentsService
      .getTournamentParticipants(this.tournamentInfo.id_tournament)
      .subscribe((response) => {
        const participants = response.data;

        let semifinalist: string;

        if (this.brackets.w != this.brackets.s1)
          semifinalist = this.brackets.s1;
        else semifinalist = this.brackets.s2;

        let sGotCoins = false;
        let wGotCoins = false;

        participants.map((participant) => {
          if (!sGotCoins && participant.name == semifinalist) {
            this.usersService
              .addCoins(participant.id_user, 5)
              .subscribe((response) => {
                if (response.status == 'error') {
                  return;
                }

                sGotCoins = true;
              });
          }

          if (!wGotCoins && participant.name == this.brackets.w) {
            this.usersService
              .addCoins(participant.id_user, 10)
              .subscribe((response) => {
                if (response.status == 'error') {
                  return;
                }

                wGotCoins = true;
              });
          }

          if (sGotCoins && wGotCoins) {
            return;
          }
        });
      });
  }

  endTournament() {
    this.tournamentsService
      .endTournament(this.tournamentInfo.id_tournament)
      .subscribe();
  }

  async createParticipantsListModal() {
    let participants: UserData[] = [];

    this.tournamentsService
      .getTournamentParticipants(this.tournamentInfo.id_tournament)
      .subscribe(async (response) => {
        if (response.message) {
          this.ionToastService.presentToast(response.message);
        }

        participants = response.data;

        const modal = await this.modalController.create({
          component: TournamentParticipantsPage,
          componentProps: {
            participants: participants,
            id_tournament: this.tournamentInfo.id_tournament,
          },
        });

        await modal.present();

        await modal.onDidDismiss();
        // aqui deve estar uma função que ajeita as chaves se alguém tiver sido kickado
        // TODO, aqui deve ter uma tratativa para executar o onInit só se alguém tiver sido kickado (Input e Output)
        this.ngOnInit();
        this.adjustBracketsAfterKickedUser();
      });
  }

  // TODO, desativar o botão de kickar se o torneio tiver sido encerrado
  adjustBracketsAfterKickedUser() {
    this.tournamentsService
      .getTournamentKickedParticipants(this.tournamentInfo.id_tournament)
      .subscribe(async (response) => {
        if (response.status == 'error') {
          await this.ionToastService.presentToast(
            'An error has occured.',
            'middle'
          );
          return;
        }

        const tournamentKickedParticipants = response.data;

        let tournamentKickedUsersNames: String[] = [];

        tournamentKickedParticipants.map((element) => {
          tournamentKickedUsersNames.push(element.name);
        });

        tournamentKickedUsersNames.forEach((kickedParticipantName) => {
          if (this.column2[0].includes(kickedParticipantName.toString())) {
            console.log('s1 foi kickado');
            if (!this.isStringEmpty(this.column2[1])) {
              // passar o s2 pra w e salvar torneio

              this.column2[0] = kickedParticipantName + ' (kickado)';
              this.column3[0] = this.column2[1];
              this.setParticipantInBracket('s1', this.column2[0]);
              this.setParticipantInBracket('w', this.column2[1]);
              // this.saveTournament();
            } else {
              // TODO
            }

            return;
          }

          if (this.column2[1].includes(kickedParticipantName.toString())) {
            console.log('s2 foi kickado');
            if (!this.isStringEmpty(this.column2[0])) {
              // passar o s1 pra w e salvar torneio

              this.column2[1] = kickedParticipantName + ' (kickado)';
              this.column3[0] = this.column2[0];
              this.setParticipantInBracket('s2', this.column2[1]);
              this.setParticipantInBracket('w', this.column2[0]);
              // this.saveTournament();
            } else {
              // TODO
            }

            return;
          }

          if (this.column1[0].includes(kickedParticipantName.toString())) {
            console.log('p1 foi kickado');
            if (!this.isStringEmpty(this.column1[1])) {
              // passar o p2 pra s1 e salvar torneio

              this.column1[0] = kickedParticipantName + ' (kickado)';
              this.column2[0] = this.column1[1];
              this.setParticipantInBracket('p1', this.column1[0]);
              this.setParticipantInBracket('s1', this.column1[1]);
              // this.saveTournament();
            } else {
              // TODO
            }

            return;
          }

          if (this.column1[1].includes(kickedParticipantName.toString())) {
            console.log('p2 foi kickado');
            if (!this.isStringEmpty(this.column1[0])) {
              // passar o p1 pra s1 e salvar torneio

              this.column1[1] = kickedParticipantName + ' (kickado)';
              this.column2[0] = this.column1[0];
              this.setParticipantInBracket('p2', this.column1[1]);
              this.setParticipantInBracket('s1', this.column1[0]);
              // this.saveTournament();
            } else {
              // TODO
            }

            return;
          }

          if (this.column1[2].includes(kickedParticipantName.toString())) {
            console.log('p3 foi kickado');
            if (!this.isStringEmpty(this.column1[3])) {
              // passar o p4 pra s2 e salvar torneio

              this.column1[2] = kickedParticipantName + ' (kickado)';
              this.column2[1] = this.column1[3];
              this.setParticipantInBracket('p3', this.column1[2]);
              this.setParticipantInBracket('s2', this.column1[3]);
              // this.saveTournament();
            } else {
              // TODO
            }

            return;
          }

          if (this.column1[3].includes(kickedParticipantName.toString())) {
            console.log('p4 foi kickado');
            if (!this.isStringEmpty(this.column1[2])) {
              // passar o p3 pra s2 e salvar torneio

              this.column1[3] = kickedParticipantName + ' (kickado)';
              this.column2[1] = this.column1[2];
              this.setParticipantInBracket('p4', this.column1[3]);
              this.setParticipantInBracket('s2', this.column1[2]);
              // this.saveTournament();
            } else {
              // TODO
            }

            return;
          }
        });

        // console.log(this.column1);
        // console.log(this.column2);
      });
  }
}

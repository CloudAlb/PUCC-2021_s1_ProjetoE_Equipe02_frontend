import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastroService } from 'src/app/services/cadastro.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {
  public user = {
    nome: '',
    usuario: '',
    email: '',
    password: '',
    data_nascimento: '',
  };

  // esquema do Matheus
  public name; //= 'Matheus Albino';
  public username; //= 'MAlb';
  public email; //= 'malb@gmail.com';
  public password; //= '12345678';
  public birth_date; //= '2001-10-16';

  public maxDate = '';

  public fGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ionToastService: IonToastService,
    private cadastroService: CadastroService,
    private sessionManagerService: SessionManagerService,
    private sessionsService: SessionsService
  ) {
    this.maxDate = this.getTodayDate();

    this.fGroup = this.fBuilder.group({
      nome: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      usuario: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
      ],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
        ]),
      ],
      senha: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      data_nascimento: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    //this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // Serve para setar os dados no formulário
    // this.fGroup.get('nome').setValue()
  }

  public cadastrar(
    name: string,
    username: string,
    email: string,
    password: string,
    birth_date: string
  ) {
    this.cadastroService
      .postCadastro({ name, username, email, password, birth_date })
      .subscribe(async (response) => {
        if (response.error) {
          await this.ionToastService.presentToast(response.error, 'bottom');
          return;
        }

        // this.sessionManagerService.setToken(response.token.token);
        // this.sessionsService.setUserData();

        await this.ionToastService.presentToast(response.message, 'bottom');

        this.router
          .navigate(['/login'], { relativeTo: this.route.parent })
          .then(() => {});
      });
  }

  private getTodayDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  submitForm() {
    console.log(this.fGroup.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-criar-torneio',
  templateUrl: './criar-torneio.page.html',
  styleUrls: ['./criar-torneio.page.scss'],
})
export class CriarTorneioPage implements OnInit {
  public torneio = {
    nome: '',
    jogo: '',
    num_times: '',
    descricao: '',
  };

  public fGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder
  ) {
    this.fGroup = this.fBuilder.group({
      nome: [null, Validators.compose([Validators.required])],
      jogo: [null, Validators.compose([Validators.required])],
      num_times: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(2),
          Validators.max(6),
        ]),
      ],
      descricao: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {}

  submitForm() {
    console.log(this.fGroup.value);
  }
}

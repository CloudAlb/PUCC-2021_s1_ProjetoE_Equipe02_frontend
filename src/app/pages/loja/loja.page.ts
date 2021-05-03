import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.page.html',
  styleUrls: ['./loja.page.scss'],
})
export class LojaPage implements OnInit {
  public avatarPath = "assets/icons/defaultIcon.svg";
  public emojiMorto = "assets/emojis/morto.svg";
  public molduraCoracao = "assets/molduras/coracao.svg";
  public avatarRobo = "assets/avatares/robo.svg";
  public backgroud001 = "assets/backgrounds/001.svg";

  constructor() { }

  ngOnInit() {
  }

}

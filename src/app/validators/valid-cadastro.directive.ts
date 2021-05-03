import { Directive } from '@angular/core';

@Directive({
  selector: '[appValidCadastro]'
})
export class ValidCadastroDirective {
  static validDate(date){
    console.log('validação:'+date)
    return true
  }
  constructor() { }

}

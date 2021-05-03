import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

// construí para facilitar nos parâmetros dos métodos dessa classe
interface AlertButton {
  text: string;
  role?: string;
  cssClass?: string | string[];
  handler?: (
    value: any
  ) =>
    | boolean
    | void
    | {
        [key: string]: any;
      };
}

type TextFieldTypes =
  | 'date'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | 'time'
  | 'week'
  | 'month'
  | 'datetime-local';

interface AlertInput {
  type?: TextFieldTypes | 'checkbox' | 'radio' | 'textarea';
  name?: string;
  value?: string;
}

@Injectable({
  providedIn: 'root',
})
export class IonAlertService {
  constructor(private alertController: AlertController) {}

  public async presentAlertMultipleButtons(header: string, message: string, buttons: Array<string> | Array<AlertButton>, subheader?: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subheader,
      message: message,
      buttons: buttons
    });

    await alert.present();
  };

  public async presentAlertPrompt(
    header: string,
    inputs: Array<AlertInput>,
    buttons: Array<string> | Array<AlertButton>,
    message?: string
  ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      inputs: inputs,
      buttons: buttons,
    });

    await alert.present();
  }
}

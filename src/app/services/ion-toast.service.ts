import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonToastService {

  constructor(private toastController: ToastController) { }

  public async presentToast(message: string, position?: "top" | "middle" | "bottom") {
    if (!position) position = "bottom";

    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: "dark",
      position: position
    });
    toast.present();
  }
}

import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab3Page { constructor(
    public service: SenhasService,
    private alertController: AlertController) {}

 async mostrarAlerta (senha: string) {
  const alert = await this.alertController.create ( {  
    header: 'Senha emitida',
    message: `Sua senha foi: ${senha }`,
    buttons: ['OK']
  });
  await alert.present();
 }
}
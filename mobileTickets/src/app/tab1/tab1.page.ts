import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab1Page {
  constructor(
    public service: SenhasService,
    private alertController: AlertController
  ) {}
  async gerarSenha(tipo: string) {
  try {
    this.service.novaSenha(tipo);

    const lista = this.service.todasSenhas || [];
    const ultimaSenha = lista.length > 0 ? lista[lista.length - 1] : null;

    if (ultimaSenha) {
      const alert = await this.alertController.create({
        header: 'Senha emitida',
        message: 'Sua senha foi: ' + ultimaSenha.codigo,
        buttons: ['OK']
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Clique funcionou, mas não consegui pegar a última senha.',
        buttons: ['OK']
      });

      await alert.present();
    }
  } catch (error) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'O clique funcionou, mas deu erro ao gerar a senha.',
      buttons: ['OK']
    });

    await alert.present();
  }
  }
}

import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab2Page {

  guiche = 1;

  constructor(public service: SenhasService) {}

}

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab1Page {
  constructor(public service: SenhasService) {}
}

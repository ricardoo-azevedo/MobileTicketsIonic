import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  filaSP: any[] = [];
  filaSG: any[] = [];
  filaSE: any[] = [];

  painel: any[] = [];
  atendidas: any[] = [];
  todasSenhas: any[] = [];

  ultimaChamada: string = '';

  contadorSP = 0;
  contadorSG = 0;
  contadorSE = 0;

  novaSenha(tipo: string) {
    const now = new Date();

    const YY = now.getFullYear().toString().slice(-2);
    const MM = (now.getMonth() + 1).toString().padStart(2, '0');
    const DD = now.getDate().toString().padStart(2, '0');

    let sequencia = 0;

    if (tipo === 'SP') {
      this.contadorSP++;
      sequencia = this.contadorSP;
    }

    if (tipo === 'SG') {
      this.contadorSG++;
      sequencia = this.contadorSG;
    }

    if (tipo === 'SE') {
      this.contadorSE++;
      sequencia = this.contadorSE;
    }

    const codigo = `${YY}${MM}${DD}-${tipo}${sequencia.toString().padStart(3, '0')}`;

    const senha = {
      codigo,
      tipo,
      horaEmissao: new Date(),
      horaAtendimento: null,
      guiche: null,
    };

    if (tipo === 'SP') this.filaSP.push(senha);
    if (tipo === 'SG') this.filaSG.push(senha);
    if (tipo === 'SE') this.filaSE.push(senha);

    this.todasSenhas.push(senha);
  }
  alternar = true;
  chamarProximo(guiche: number) {
    let senha: any = null;

    if (this.ultimaChamada === 'SP') {
      if (this.alternar) {
        if (this.filaSE.length > 0) {
          senha = this.filaSE.shift();
        } else if (this.filaSG.length > 0) {
          senha = this.filaSG.shift();
        }
      } else {
        if (this.filaSG.length > 0) {
          senha = this.filaSG.shift();
        } else if (this.filaSE.length > 0) {
          senha = this.filaSE.shift();
        }
      }

      this.alternar = !this.alternar;
    } else {
      if (this.filaSP.length > 0) {
        senha = this.filaSP.shift();
      }
    }

    if (!senha) {
      if (this.filaSP.length > 0) senha = this.filaSP.shift();
      else if (this.filaSE.length > 0) senha = this.filaSE.shift();
      else if (this.filaSG.length > 0) senha = this.filaSG.shift();
    }

    if (!senha) return;

    if (Math.random() < 0.05) return;

    senha.horaAtendimento = new Date();
    senha.guiche = guiche;

    this.atendidas.push(senha);

    this.painel.unshift(senha);
    if (this.painel.length > 5) this.painel.pop();

    this.ultimaChamada = senha.tipo;
  }

  // chamarProximo(guiche: number) {
  // let senha: any = null;
  //
  // if (this.ultimaChamada === 'SP') {
  //   if (this.filaSE.length > 0) {
  //     senha = this.filaSE.shift();
  //   } else if (this.filaSG.length > 0) {
  //     senha = this.filaSG.shift();
  //   }
  // } else {
  //   if (this.filaSP.length > 0) {
  //     senha = this.filaSP.shift();
  //   }
  // }
  //
  // if (!senha) {
  //   if (this.filaSE.length > 0) senha = this.filaSE.shift();
  //   else if (this.filaSG.length > 0) senha = this.filaSG.shift();
  //   else if (this.filaSP.length > 0) senha = this.filaSP.shift();
  // }
  //
  // if (!senha) return;
  //
  // // 5% não atendidas
  // if (Math.random() < 0.05) return;
  //
  // senha.horaAtendimento = new Date();
  // senha.guiche = guiche;
  //
  // this.atendidas.push(senha);
  //
  // this.painel.unshift(senha);
  // if (this.painel.length > 5) {
  //   this.painel.pop();
  // }
  //
  // this.ultimaChamada = senha.tipo;
  //

  // }

  getRelatorio() {
    return {
      total: this.todasSenhas.length,
      atendidas: this.atendidas.length,
      SP: this.todasSenhas.filter((s) => s.tipo === 'SP').length,
      SG: this.todasSenhas.filter((s) => s.tipo === 'SG').length,
      SE: this.todasSenhas.filter((s) => s.tipo === 'SE').length,
    };
  }
}

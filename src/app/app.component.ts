import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@Services/authentication.service';
import {
  Init,
  Chip,
  Contactless,
  Cancel,
  Close
} from './interface/index.payment';
import { Login } from 'app/interface/index.api';
import { Item } from '@Interface/item-interface';
import { ToastService } from '@Services/toast.service';
import { environment } from '@Env/environment';
import { WebsocketService } from '@Services/websocket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'front-pos';
  vMonto = 0;
  vIdKiosco = 0;
  vIdBranch = 0;
  vTransaccion = 0;
  vTipo: Item[];
  vInicial = 'Seleccione opción';
  vToken: any;
  public vSeleccion: number = 0;
  constructor(
    private _auth: AuthenticationService,
    private _toast: ToastService,
    private _socket: WebsocketService
  ) {
    this.vIdKiosco = Number(this._auth.getKiosk());
    this.vIdBranch = Number(this._auth.getBranch());
    //Solicitamos token
    let vUsername = environment.usuario;
    let vPassword = environment.password;
    let login: Login = {
      username: vUsername,
      password: vPassword,
    };
    this._auth.login(login);
    this.vToken = this._auth.getUserToken();
  }
  ngOnInit() {
    this.vTipo = [
      { label: 'Inicialización', value: 1 },
      { label: 'Pago con chip', value: 2 },
      { label: 'Pago sin contacto', value: 3 },
      { label: 'Cancelar', value: 4 },
      { label: 'Cierre de caja', value: 5 },
    ];
  }

  onKeyMonto(event: any) {
    this.vMonto = Number(event.target.value);
  }

  onKeyTransaction(event: any) {
    this.vTransaccion = Number(event.target.value);
  }

  pagar() {
    if(this.vToken) {
      switch (this.vSeleccion) {
        case 1:
          /**
           * Inicialización de POS
           */
          let init: Init = {
            token: `Bearer ${this.vToken}`,
            idKiosk: this.vIdKiosco,
            confirm: true,
            multi: false,
          };
          this._socket.sendInit(init);
          break;
        case 2:
          /**
           * Pago con chip
           */
          if (this.vMonto != 0 && this.vMonto != null) {
            let chip: Chip = {
              token: `Bearer ${this.vToken}`,
              idKiosk: this.vIdKiosco,
              amount: this.vMonto,
              multi: false,
            };
            this._socket.sendChip(chip);
          }
          break;
        case 3:
          /**
           * Pago sin contacto
           */
          if (this.vMonto != 0 && this.vMonto != null) {
            let contactless: Contactless = {
              token: `Bearer ${this.vToken}`,
              idKiosk: this.vIdKiosco,
              amount: this.vMonto,
              multi: false,
            };
            this._socket.sendContactless(contactless);
          }
          break;
        case 4:
          /**
           * Cancelar de pago
           */
          if (this.vTransaccion >= 0) {
            let cancel: Cancel = {
              token: `Bearer ${this.vToken}`,
              idKiosk: this.vIdKiosco,
              idTransaction: this.vTransaccion,
              multi: false,
            };
            this._socket.sendCancel(cancel);
          }
          break;
        case 5:
          /**
           * Cierre de lote
           */
          let close: Close = {
            token: `Bearer ${this.vToken}`,
            idKiosk: this.vIdKiosco,
            confirm: true,
            multi: false,
          };
          this._socket.sendClose(close);
          break;
        default:
          /**
           * Ninguna opción
           */
          this._toast.warning('Operación no válida');
          break;
      }
    }
  }

  select(data: string) {
    this.vSeleccion = Number(data);
  }

  ngOnDestroy() {
    this._socket.closeSocket();
  }
}

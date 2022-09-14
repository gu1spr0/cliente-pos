import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@Services/authentication.service';
import { PaymentService } from '@Services/payment.service';
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
import { BlockUIService } from 'ng-block-ui';
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
  public vSeleccion: number = 0;
  constructor(
    private _auth: AuthenticationService,
    private _payment: PaymentService,
    private _toast: ToastService
  ) {
    this.vIdKiosco = environment.idKiosco;
    this.vIdBranch = environment.idBranch;
    //Solicitamos token
    let vUsername = environment.usuario;
    let vPassword = environment.password;
    let login: Login = {
      username: vUsername,
      password: vPassword,
    };
    this._auth.login(login);
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
    switch (this.vSeleccion) {
      case 1:
        /**
         * Inicialización de POS
         */
        let init: Init = {
          token: this._auth.getUserToken()!,
          idKiosk: this.vIdKiosco,
          confirm: true,
          multi: false,
        };
        this._payment.sendInit(init);
        break;
      case 2:
        /**
         * Pago con chip
         */
        if (this.vMonto != 0 && this.vMonto != null) {
          let chip: Chip = {
            token: this._auth.getUserToken()!,
            idKiosk: this.vIdKiosco,
            amount: this.vMonto,
            multi: false,
          };
          this._payment.sendChip(chip);
        }
        break;
      case 3:
        /**
         * Pago sin contacto
         */
        if (this.vMonto != 0 && this.vMonto != null) {
          let contactless: Contactless = {
            token: this._auth.getUserToken()!,
            idKiosk: this.vIdKiosco,
            amount: this.vMonto,
            multi: false,
          };
          this._payment.sendContactless(contactless);
        }
        break;
      case 4:
        /**
         * Cancelar de pago
         */
        if (this.vTransaccion >= 0) {
          let cancel: Cancel = {
            token: this._auth.getUserToken()!,
            idKiosk: this.vIdKiosco,
            idTransaction: this.vTransaccion,
            multi: false,
          };
          this._payment.sendCancel(cancel);
        }
        break;
      case 5:
        /**
         * Cierre de lote
         */
        let close: Close = {
          token: this._auth.getUserToken()!,
          idKiosk: this.vIdKiosco,
          confirm: true,
          multi: false,
        };
        this._payment.sendClose(close);
        break;
      default:
        /**
         * Ninguna opción
         */
        this._toast.warning('Operación no válida');
        break;
    }
  }
  select(data: string) {
    this.vSeleccion = Number(data);
  }

  ngOnDestroy() {
    this._payment.closeSocket();
  }
}

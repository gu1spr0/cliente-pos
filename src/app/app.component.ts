import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@Services/authentication.service';
import { PaymentService } from '@Services/payment.service';
import { WebsocketService } from '@Services/websocket.service';
import {
  Init,
  Chip,
  Contactless,
  Cancel,
  Close,
  Suscribir,
} from './interface/index.payment';
import { Login } from 'app/interface/index.api';
import { Item } from '@Interface/item-interface';
import { ToastService } from '@Services/toast.service';
import { environment } from '@Env/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'front-pos';
  vMonto = 0;
  vTransaccion = 0;
  vTipo: Item[];
  vInicial = 'Seleccione opción';
  public vSeleccion: number = 0;
  constructor(
    private _auth: AuthenticationService,
    private _payment: PaymentService,
    private _toast: ToastService
  ) {
    //Solicitamos token
    let data: Login = {
      username: environment.usuario,
      password: environment.passoword,
    };
    this._auth.login(data);
    let token = this._auth.getUserToken();
    //Nos conectamos y suscribimos
    if (token) {
      let subscribir: Suscribir = {
        token: token,
        username: this._auth.getUsername()!,
        idCommerce: Number(this._auth.getCommerce()),
        idBranch: Number(this._auth.getBranch()),
        idKiosk: Number(this._auth.getKiosk()),
        idDevice: Number(this._auth.getDevice()),
      };
      this._payment.conectar(subscribir);
    }
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
          idKiosk: Number(this._auth.getKiosk()),
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
            idKiosk: Number(this._auth.getKiosk()),
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
            idKiosk: Number(this._auth.getKiosk()),
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
        if(this.vTransaccion >= 0){
          let cancel: Cancel = {
            token: this._auth.getUserToken()!,
            idKiosk: Number(this._auth.getKiosk()),
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
          idKiosk: Number(this._auth.getKiosk()),
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
  select(data: string){
    console.log(">>>>>>>>>>>>>>>>>>>>"+data);
    this.vSeleccion = Number(data);
  }
}

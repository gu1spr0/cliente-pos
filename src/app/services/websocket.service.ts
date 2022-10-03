import { Injectable } from '@angular/core';
import { VarApis } from '../settings/index.var';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ToastService } from './toast.service';
import { Suscribir } from '@Interface/subscribe-interface';
import { Init } from '@Interface/init-interface';
import { Chip } from '@Interface/chip-interface';
import { Contactless } from '@Interface/contactless-interface';
import { Cancel } from '@Interface/cancel-interface';
import { Close } from '@Interface/close-interface';
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private url = VarApis.MSG_PRINCIPAL;
  public stompClient: Stomp.Client;
  public respuesta: any;
  constructor(private _toast: ToastService) {}
  public conectar(data: Suscribir) {
    let socket = new SockJS(this.url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.heartbeat.incoming = 1000;
    this.stompClient.heartbeat.outgoing = 1000;
    this.stompClient.connect(
      { 'X-Authorization': `Bearer ${data.token}` },
      (frame: any) => {
        if (!this.stompClient) {
          this._toast.warning('Ocurrio un error!'); //Mostrando mensaje se puede reemplazar por console.log
          return;
        }
        setTimeout(() => {
          this._toast.info('Servicio iniciado!'); //Mostrando mensaje se puede reemplazar por console.log
        }, 300);
        this._subscribeTopic(data);
      }
    );
    return this.stompClient;
  }

  private _subscribeTopic(data: Suscribir) {
    if (!this.stompClient) {
      setTimeout(() => {
        this._toast.error('Error al suscribirse al servicio!');
      }, 300);
      return;
    }
    let cadenaSubs = `/user/${data.username}/msg/${data.idCommerce}/${data.idBranch}/${data.idKiosk}`;
    let topicSubs = '/topic/notify';
    this.stompClient.subscribe(cadenaSubs, (notifications: any) => {
      if (notifications.body) {
        this.respuesta = JSON.parse(notifications.body);
        switch (Number(this.respuesta.code)) {
          case 0:
            this._toast.warning(this.respuesta.message)
            setTimeout(() => {
              window.location.reload();
            },4000);
            break;
          case 1:
          case 2:
          case 3:
          case 4:
            this._toast.warning(this.respuesta.message);
            break;
          case 5:
            this._toast.success('Pago exitoso!, gracias por su compra');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
            break;
          default:
            this._toast.error('Error desconocido!')
            setTimeout(() => {
              window.location.reload();
            },4000);
            break;
        }
      }
    });
    this.stompClient.subscribe(topicSubs, (notifications: any) => {
      let notification = JSON.parse(notifications.body);
      this._toast.warning(`${notification.message} : ${notification.data}`);
    });
  }

  sendInit(init: Init) {
    this.stompClient.send(VarApis.MSG_INIT, {}, JSON.stringify(init));
  }

  sendChip(chip: Chip) {
    this.stompClient.send(VarApis.MSG_CHIP, {}, JSON.stringify(chip));
  }

  sendContactless(contactless: Contactless) {
    this.stompClient.send(VarApis.MSG_CONTACTLESS, {}, JSON.stringify(contactless));
  }

  sendCancel(cancel: Cancel) {
    this.stompClient.send(VarApis.MSG_CANCEL, {}, JSON.stringify(cancel));
  }

  sendClose(close: Close) {
    this.stompClient.send(VarApis.MSG_CLOSE, {}, JSON.stringify(close));
  }

  closeSocket() {
    this.stompClient.disconnect(() => {
      console.log('Desconectado!');
    });
  }
}

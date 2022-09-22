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
        //let respuesta : any
        let respuesta = JSON.parse(notifications.body);
        switch (Number(respuesta.data)) {
          case 1:
            this._toast.warning(respuesta.message);
            break;
          case 2:
            this._toast.info(respuesta.message);
            break;
          case 3:
            this._toast.warning(respuesta.message);
            break;
          default:
            if (!respuesta.success) {
              this._toast.error(respuesta.message);
            } else {
              if (
                respuesta.data.codigoRespuesta == '00' &&
                respuesta.data.codAutorizacion != null
              ) {
                this._toast.info(
                  `Pago realizado: ${respuesta.data.numeroRecibo}`
                );
              }
              if (respuesta.data.codigoRespuesta == '99') {
                this._toast.warning(respuesta.message);
              }
            }
            //En el caso de que se requiera actualizar la pagina
            setTimeout(() => {
              window.location.reload();
            }, 5000);

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

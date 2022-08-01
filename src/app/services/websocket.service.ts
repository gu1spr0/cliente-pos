import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { VarApis } from 'app/settings/VarApis';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private url = VarApis.MSG_INIT;
  clientStomp: any;
  constructor() { }
  public connect(){
    let socket = new SockJS(this.url);
    this.clientStomp = Stomp.over(socket);
    return this.clientStomp;
  }
  _disconnect(){
    if(this.clientStomp !== null){
      this.clientStomp.disconnect();
    }
  }
  onMessageReceived(message: any){
    console.log("[Mensaje Recibido]:" + message);
  }

}

import { Injectable } from '@angular/core';
import { VarApis } from '../settings/index.var';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private url = VarApis.MSG_PRINCIPAL;
  constructor() {}
  public connect() {
    const socket = new SockJS(this.url)
    const stompClient = Stomp.over(socket)
    stompClient.heartbeat.incoming = 1000;
    stompClient.heartbeat.outgoing = 1000;
    return stompClient;
  }
}

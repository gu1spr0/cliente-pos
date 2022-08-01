import { Component } from '@angular/core';
import { WebsocketService } from '@Services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-pos';
  constructor(
    private socket: WebsocketService,
  ){
    console.log("Iniciando websocket");
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfUEFSUVVFT1wifV0iLCJzdWIiOiJraW9zY28iLCJpYXQiOjE2NTkzNjYzMjgsImV4cCI6MTY1OTM2OTkyOH0.7Y_gtHW7ZIo6b1Sp0jUG-RrW36FS_RTiymTSEs4oDCI1sBfmcOzdCmrlvQhyOJItd2mdjfdJTt2sJVrqmTfrBA"
    let stompClient = this.socket.connect();
      stompClient.connect({"X-Authorization":"Bearer "+token}, (frame: any) => {
        //stompClient.subscribe('/topic/'+api.getUserAgency()+'/'+api.getUserChannel(), (notifications: any) => {
        stompClient.subscribe(`/user/kiosco/msg/1`, (notifications: any) => {
          console.log(JSON.stringify(notifications.body))
          //this.showGreeting(notifications);
        });
        /**
         * 1 -> INIT
         * 2 -> CHIP
         * 4 -> CTL
         * 6 -> DELETED
         * 8 -> CLOSE
         */
        stompClient.send('/app/pay', {}, JSON.stringify(
          {'token': token,
          'idKiosc': 1,
          'idDevice':1,
          'amount':2,
          'transaction':250,
          'confirmClose':1,
          'type':4}));
      });
  }
}

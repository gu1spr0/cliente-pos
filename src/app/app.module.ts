import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { WebsocketService } from '@Services/websocket.service';
import { ApiService } from '@Services/api.service';
import { AuthenticationService } from '@Services/authentication.service';
import { PaymentService } from '@Services/payment.service';
import { ToastService } from '@Services/toast.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 9000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    FormsModule
  ],
  providers: [
    ApiService,
    ToastService,
    WebsocketService,
    AuthenticationService,
    PaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

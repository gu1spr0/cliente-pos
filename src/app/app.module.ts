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
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from './@component/block-template';
@NgModule({
  declarations: [
    AppComponent,
    BlockTemplateComponent
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
    FormsModule,
    BlockUIHttpModule.forRoot({
      blockAllRequestsInProgress: true
    }),
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    })
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@Services/authentication.service';
import { createFormGroup, validateKeysForm } from 'app/@components/functions';
import { PageLoginData } from './PageLogin.data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  isTypePassword = true;
  dataLogin = new PageLoginData();

  constructor(
    private _fb: FormBuilder,
    private _authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.form = createFormGroup(this._fb, this.dataLogin.itemsForm);
  }

  /**
   * Redireccioinar al usuario
   */
  goToRedirect() {
    if (this.form.valid) {
      this._authentication.login(this.form.value);
    } else {
      validateKeysForm(this.form);
    }
  }

  /**
   * Evento enter
   */
  enterSubmit(event: any) {
    if(event.key === 'Enter') {
      this.goToRedirect();
    }
  }



}

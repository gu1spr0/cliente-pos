import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private _toastr: ToastrService
  ) { }

  /**
   * 
   * @param message Mensaje a mostrar
   */
  public success(message: string): void {
    this._toastr.success(message, 'Correcto');
  }

  /**
   * 
   * @param message Mensaje a mostrar
   */
  public warning(message: string): void {
    this._toastr.warning(message, 'Precaución');
  }

  /**
   * 
   * @param message Mensaje a mostrar
   */
  public error(message: string): void {
    this._toastr.error(message, 'Error');
  }

  /**
   * 
   * @param message Mensaje a mostrar
   */
  public info(message: string): void{
    this._toastr.info(message, 'Información');
  }
}

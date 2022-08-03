import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient
  ) { }
  
  /**
   * 
   * @param url Endpoint a consumir
   * @returns Observable
   */
  getDataValues(url: string): Observable<any> {
    return this._http.get(url);
  }

  /**
   * 
   * @param url Endpoint a consumir
   * @param data Payload para registro
   * @returns Observable
   */
  postDataValues(url: string, data: any): Observable<any> {
    return this._http.post(url, data);
  }

  /**
   * 
   * @param url Endpoint a consumir
   * @param data Payload para registro
   * @returns Obaservable
   */
  putDataValues(url: string, data: any): Observable<any> {
    return this._http.put(url, data);
  }
}

import { environment } from '@Env/environment';
export class VarApis {
  static URL_API = environment.Url;
  //ENDPOINTS API REST
  static URL_LOGIN = `${VarApis.URL_API}/api/login`;
  static URL_LOGOUT = `${VarApis.URL_API}/api/logout`;
  //ENDPOINTS API WEBSOCKET
  static MSG_PRINCIPAL = `${VarApis.URL_API}/pos`
  static MSG_INIT = '/app/init';
  static MSG_CHIP = '/app/chip';
  static MSG_CONTACTLESS = '/app/contactless';
  static MSG_CANCEL = '/app/cancel';
  static MSG_CLOSE = '/app/close';
}

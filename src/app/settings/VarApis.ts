import { environment } from '@Env/environment';
export class VarApis {
  static URL_API = environment.Url;
  //ENDPOINTS API REST
  static URL_LOGIN = `${VarApis.URL_API}/login`;
  static URL_DOMAINS = `${VarApis.URL_API}/domains`;
  static URL_USERS = `${VarApis.URL_API}/users`;
  static URL_RESOURCES = `${VarApis.URL_API}/resources`;
  static URL_ROUTES = `${VarApis.URL_API}/routes`;
  static URL_ROLES = `${VarApis.URL_API}/roles`;
  //ENDPOINTS API WEBSOCKET
  static MSG_INIT = `${VarApis.URL_API}/pos`
  static MSG_PAY = `${VarApis.URL_API}/register`;
  static MSG_CONNECT = `${VarApis.URL_API}/unregister`;
  static MSG_DISCONNECT = `${VarApis.URL_API}/operation`;
  static MSG_ESTABLISHED = `${VarApis.URL_API}/connectivity`;
}

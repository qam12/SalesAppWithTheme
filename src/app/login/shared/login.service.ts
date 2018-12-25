import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';

import { AppSettings } from '../../appsettings';
import { Login } from './login';

@Injectable()
export class LoginService {

  ServiceUrl: string = AppSettings.API_BASE_URL + AppSettings.AUTH_LOGIN_URL;
  SelectedUserLogin: Login;
  LoginInfo: Login;

  constructor(private http: Http) {
    this.SelectedUserLogin = new Login();
  }

  UserAuthentication(username: string, password: string) {
    this.LoginInfo = new Login();
    this.LoginInfo.Username = username;
    this.LoginInfo.Password = password;

    var body = JSON.stringify(this.LoginInfo);
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.ServiceUrl, body, {headers: headerOptions});
  }

  // Post(){
  //   var body = JSON.stringify(this.SelectedUserLogin);
  //   var headerOptions = new Headers({'Content-Type': 'application/json'});
  //   var requestOptions = new RequestOptions({method : RequestMethod.Get, headers: headerOptions});
  //   return this.http.post(this.ServiceUrl + '/Login', body, requestOptions).map(x => x.json());
  // }

}

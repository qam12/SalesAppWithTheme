import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';

import { AppSettings } from '../../appsettings';
import { Userinformation } from './userinformation.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class UserinformationService {

  ServiceUrl: string = AppSettings.API_BASE_URL + AppSettings.USER_INFORMATION_URL;
  SelectedUserInformation: Userinformation;
  ListUserInformation: Userinformation[];

  constructor(private http: Http) {
    this.SelectedUserInformation = new Userinformation();
  }

  Get(id?: Number){
    var AuthHeader = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('UserToken')});
    this.http.get(this.ServiceUrl, {headers: AuthHeader})
      .map((data: Response) => {
        return data.json() as Userinformation[];
      }).toPromise().then(x => {
        this.ListUserInformation = x;
      })
  }

  Post(userinformation: Userinformation) {
    // userinformation.EntryTime = new Date();
    var body = JSON.stringify(userinformation);
    var headerOptions = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('UserToken'), 'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post, headers: headerOptions});
    return this.http.post(AppSettings.API_BASE_URL + AppSettings.AUTH_REGISTER_URL, body, requestOptions).map(x => x.json());
  }

  Put(id: number, userinformation: Userinformation) {
    console.log(userinformation);
    var body = JSON.stringify(userinformation);
    var headerOptions = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('UserToken'), 'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post, headers: headerOptions});
    return this.http.post(AppSettings.API_BASE_URL + AppSettings.AUTH_UPDATE_USER_URL + '?id=' + id, body, requestOptions)
      .map(x => x.json());
  }

  Delete(id: number) {
    console.log(id);
    var headerOptions = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('UserToken'), 'Content-Type': 'application/json'});
    return this.http.delete(this.ServiceUrl + '/' + id, new RequestOptions({headers: headerOptions})).map(x => x.json());
  }

}

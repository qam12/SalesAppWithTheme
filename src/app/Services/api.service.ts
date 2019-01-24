import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { MyNewInterface } from "../Interfaces/my-new-interface";
import { PjpNewInterface } from "../Interfaces/pjp-new-interface";
import { PjpWiseInterface } from "../Interfaces/pjp-wise-interface";
import 'rxjs/add/operator/map';
import { TrackUserList } from "app/Interfaces/TrackUserList";
import { UserLocation } from "app/Interfaces/UserLocation";


@Injectable()
export class ApiService {

  private BaseURL = '';

  private postsURL = '';
  private postsURL_S = '';


constructor(private http: Http) {}

getPosts(fromDate: String, lastDate: String):Observable<MyNewInterface[]>{
    console.log(this.postsURL + fromDate + "/" + lastDate);
    return this.http.get(this.postsURL + fromDate + "/" + lastDate)
    .map((response: Response)=>{
        return <MyNewInterface[]>response.json().tblData;
    });
}

getPJPData(fromDate: String, lastDate: String): Observable<PjpNewInterface[]> {
    console.log(this.postsURL_S + fromDate + '/' + lastDate);
    return this.http.get(this.postsURL_S + fromDate + '/' + lastDate)
    .map((response: Response) => {
      return <PjpNewInterface[]>response.json().tblData;
    });
  }
  
  getTrackingUserList(): Observable<TrackUserList[]> {
    return this.http.get(this.BaseURL + 'Telecom/GetRegisteredUserList')
    .map((response: Response) => {
      return <TrackUserList[]>response.json().tblData;
    });
  }

  Userlocation(EDate: String, EPhonNumber: String): Observable<UserLocation[]> {
    console.log(this.BaseURL + 'Telecom/GetTrackingData' + '/' + EDate + '/' + EPhonNumber)
    return this.http.get(this.BaseURL + 'Telecom/GetTrackingData' + '/' + EDate + '/' + EPhonNumber)
    .map((response: Response) => {
      return <UserLocation[]>response.json();
    });
  }

}

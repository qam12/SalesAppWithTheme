import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { MyNewInterface } from "../Interfaces/my-new-interface";
import { PjpNewInterface } from "../Interfaces/pjp-new-interface";
import { PjpWiseInterface } from "../Interfaces/pjp-wise-interface";
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {


  // Build API
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

}

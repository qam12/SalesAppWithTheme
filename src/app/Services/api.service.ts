import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { MyNewInterface } from "../Interfaces/my-new-interface";
import { PjpNewInterface } from "../Interfaces/pjp-new-interface";
import { PjpWiseInterface } from "../Interfaces/pjp-wise-interface";
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {


private postsURL = '';


constructor(private http: Http) {}

getPosts(fromDate: String, lastDate: String):Observable<MyNewInterface[]>{
    return this.http.get(this.postsURL + fromDate + "/"+ lastDate)
    .map((response: Response)=>{
        return <MyNewInterface[]>response.json().tblData;
    });
}


}

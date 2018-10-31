import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  constructor(private http:Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }
  private url = "http://localhost/canal_backend/";

  private headers=new Headers();
  public datas:any;

  public alert(): Promise<any>{
    //let params="requestParam="+(new Date()).toString();
    let link=this.url+"periodicHandler.php";
    
    return this.http.post(link,null,{headers:this.headers}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }

  public remonter(id): Promise<any>{
    //let params="id="+id;
    let data = JSON.stringify({id:id});
    let params ='param='+data;
    let link=this.url+"/remonter.php";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }

}

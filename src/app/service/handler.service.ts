import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HandlerService {

 // private url:string='http://sentool.bbstvnet.com/handler/';
  private url:string='http://localhost/crm_remonte/';
  private header :HttpHeaders;
  constructor(private http:HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
   }

  
  public callPeriodicHandler(): Promise<any>{
    let params="requestParam="+(new Date()).toString();
    let link=this.url+"/periodicHandler.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }

  public remonter(id:any): Promise<any>{
    let params="id="+id;
    let link=this.url+"/remonter.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }
 
}

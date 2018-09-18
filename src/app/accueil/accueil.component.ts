import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  reponse:string='';
  message:string='';
  listRemonte:any=[];
  indice:number;
  
   
  Result =[
    {etat:'reussi'},
    {etat:'Echec'},
  ]

  Echec =[
    {info:'Compte client plafonné'},
    {info:'Client non abonné'},
    {info:'Solde client insuffisant'},
  ]

 
  /*valid(i:number){
    this.reponse=undefined;
    this.reponse=undefined;
  }*/
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  constructor(private modalService: BsModalService,public accueilService:HandlerService) { }
  requete:any=[];
  numero:any;
  num:any;
  montant:any;
  id:any;
  audio:any;
  dateOp:any;
  operateur:any;
  phone:any;
  remonter(idR:number){
      idR=this.id;
      console.log(idR,this.numFile,this.reponse,this.message)
      this.accueilService.remonter(idR,this.numFile,this.reponse,this.message,this.operateur,this.phone);
      this.listRemonte[this.indice].handled=1;
  }
  numFile:any;
  getId(i:number){
    this.indice = i;
    this.playNotif=0;
    this.id=this.listRemonte[i].id;
    this.dateOp = this.listRemonte[i].dateOp;
    //this.listRemonte[i].handled=1;
    this.numFile = this.listRemonte[i].numfile;
    this.operateur = this.listRemonte[i].service;
    this.phone = this.listRemonte[i].phone;
    if(this.listRemonte[i].requette.indexOf('/') > -1){
      this.numeroTraiter = this.getInfo(this.listRemonte[i],"numero");
      this.montantTraiter = this.getInfo(this.listRemonte[i],"montant");  
    }else{
      this.numeroTraiter = this.getInfo(this.listRemonte[i],"infoClient");
      this.montantTraiter = this.getInfo(this.listRemonte[i],"montant");  
    }
    this.reponse=null;
    this.message = null;
  }
  playNotif:number=0;
  
  numeroTraiter:any;
  montantTraiter:any;

  code:number;
  requette:any;
  result:any;
  ngOnInit() {
   
    setInterval(() => {
      this.accueilService.callPeriodicHandler().then( res => {
      console.log(res['message']+"\n");
      console.log(res['code']);
      this.code=res['code'];
      if(this.code == 1)
      { 
        this.listRemonte=res['message'];
        this.playNotif=1;
      }
      if(this.playNotif == 1){
        this.audio = new Audio();
        this.audio.src ='./assets/windows-8-sms.mp3';
        this.audio.play();  
      }
    } );
      
    }, 10000); 

    
  }
  size:number=0;
  getInfo(row, type){
    if(row.requette.indexOf('/') > -1){
      if(type == "requete"){
        this.size= row.requette.split("/").length;
         if(this.size == 2 && row.service== "AirTime-Tigo"){
           return "IZI";
         }
         if(this.size == 2 && row.service== "AirTime-Orange"){
           return "SEDDO";
         }
         if(this.size == 2 && row.service== "AirTime-Expresso"){
           return "YAKALMA";
         }
         return row.requette.split("/",1);
       }
       if(type == "numero"){
           if(row.service== "orange money"){
             if(row.requette.split("/")[0] == '1'){
               return row.requette.split("/")[2];
             }
             if(row.requette.split("/")[0] == '2'){
               return row.requette.split("/")[1];
             }
             if(row.requette.split("/")[0] == '3'){
               return row.requette.split("/")[6];
             }
           }
           if(row.requette.split("/").length == 2 && row.service== "AirTime-Orange" || row.service== "AirTime-Tigo" || row.service== "AirTime-Expresso"){
             return row.requette.split("/")[1];
           }
           
   
           if(row.service== "tigo cash"){
             if(row.requette.split("/")[0] == '2'){
               return row.requette.split("/")[1];
             }
             if(row.requette.split("/")[0] == '3'){
               return row.requette.split("/")[1];
             }
             if(row.requette.split("/")[0] == '4'){
               return row.requette.split("/")[4];
             }
           }    
        }
   
       if(type == "montant"){
         if(row.requette.split("/").length == 2 && row.service== "AirTime-Orange" || row.service== "AirTime-Tigo" || row.service== "AirTime-Expresso"){
           return row.requette.split("/")[0];
         }
         if(row.service== "orange money"){
           if(row.requette.split("/")[0] == '1'){
             return row.requette.split("/")[1];
           }
           if(row.requette.split("/")[0] == '2'){
            return row.requette.split("/")[2];
          }
          if(row.requette.split("/")[0] == '3'){
            return row.requette.split("/")[7];
          }
         }
          
          if(row.service== "tigo cash"){
           if(row.requette.split("/")[0] == '2'){
             return row.requette.split("/")[2];
            }
            if(row.requette.split("/")[0] == '3'){
            return row.requette.split("/")[2];
            }
            if(row.requette.split("/")[0] == '4'){
              return row.requette.split("/")[5];
            } 
          }
        
        }
   
    }else{
        if(type == 'service'){
          return JSON.parse(row.requette).service;
        }
        if(type == 'infoClient'){
          return JSON.parse(row.requette).infoClient;
        }
        if(type == 'montant'){
          return JSON.parse(row.requette).montant;
        }

      }
     return "erreur";
    }
   





}

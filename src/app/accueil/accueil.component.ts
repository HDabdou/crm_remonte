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
  remonter(idR:number){
      idR=this.id;
      console.log(idR,this.numFile,this.reponse,this.message)
      this.accueilService.remonter(idR,this.numFile,this.reponse,this.message);
     
  }
  numFile:any;
  getId(i:number){
    this.playNotif=0;
    this.id=this.listRemonte[i].id;
    this.dateOp = this.listRemonte[i].dateOp;
    this.listRemonte[i].handled=1;
    this.numFile = this.listRemonte[i].numfile;
    this.numeroTraiter = this.getInfo(this.listRemonte[i],"numero");
    this.montantTraiter = this.getInfo(this.listRemonte[i],"montant");
    this.reponse=null;
    this.message = null;
  }
  playNotif:number=0;
  
  numeroTraiter:any;
  montantTraiter:any;

  code:number;
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

      if(this.playNotif== 1){
        this.audio = new Audio();
        this.audio.src ='./assets/windows-8-sms.mp3';
        this.audio.play();  
      }
      
      } );
      
    }, 10000); 

    
  }
  getInfo(row, type){
    if(type == "requete"){
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
     return "erreur";
    }
   





}

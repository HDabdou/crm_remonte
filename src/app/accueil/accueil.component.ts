import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  result:string='';
  cause:string='';
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

 
  valid(i:number){
    this.result=undefined;
    this.cause=undefined;
  }
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
  remonter(idR:number){
      idR=this.id;
      this.accueilService.remonter(idR);
     
  }
 
  getId(i:number){
    this.playNotif=0;
    this.id=this.listRemonte[i].id;
    this.listRemonte[i].handled=1;
   
  }
  playNotif:number=0;
  

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
         for(let i of res['message']){
           console.log(i.requette)
           this.requete=i.requette.split("/",1);
           this.numero=i.requette.split("/");
           this.num =this.numero[1];
           this.montant =this.numero[2];
   
         }
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

}

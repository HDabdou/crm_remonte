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
  Remoter =[
    {phone:'1',service:'depot',operateur:'orange', numero:'779854080', montant:'50000', dateOp:'2018-09-03',etat:0,select:0},
    {phone:'1',service:'retrait',operateur:'tigo cash', numero:'761554080', montant:'4000', dateOp:'2018-09-10',etat:0,select:0},
    {phone:'2',service:'depot',operateur:'orange', numero:'779854080', montant:'50000', dateOp:'2018-09-19',etat:0,select:0},
    {phone:'6',service:'depot',operateur:'orange', numero:'779893480', montant:'50000', dateOp:'2018-09-28',etat:0,select:0},
    {phone:'1',service:'depot',operateur:'tigo cash', numero:'769857080', montant:'50000', dateOp:'2018-09-04',etat:0,select:0},
  ]
   
  Result =[
    {etat:'reussi'},
    {etat:'Echec'},
  ]

  Echec =[
    {info:'Compte client plafonné'},
    {info:'Client non abonné'},
    {info:'Solde client insuffisant'},
  ]
  select(i:number){
    this.Remoter[i].select=1;
  }
  remonterOp(i:number){
    console.log(this.Remoter[i].etat)
  }
  valid(i:number){
    this.Remoter[i].etat=1;
    this.Remoter[i].select=0;
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
  remonyer(idR:number){
      idR=this.id;
      this.accueilService.remonter(idR);
      this.listRemonte.handled=1;
  }
  getId(i:number){
    this.playNotif=0;
    this.id=this.listRemonte[i].id;
    this.listRemonte[i].handled=1;
  }
  playNotif:number=0;
  play(){
    if(this.playNotif=1){
      this.audio = new Audio();
      this.audio.src ='./assets/windows-8-sms.mp3';
      this.audio.play();  
    }else{
      this.audio.pause()
    }
  }

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

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  constructor(private modalService: BsModalService,public _activation:HandlerService) { }
  listeAbonner:any=[];
  listeAlert:any = [];
  playNotif:number=0;
  audio:any;
  abonnementChoisie:any;
  requete:number=0;
  indiceGlobale:number;
  getAbonnement(i){
    this.indiceGlobale = i;
    this.abonnementChoisie = this.listeAlert[i];
    this.requete = this.getInfo1(this.abonnementChoisie.requete,"requete");
    this.playNotif = 0;
  }
  abonner(id){
    this._activation.remonter(id).then( res =>{
        console.log(res);
    });
    this.listeAlert[this.indiceGlobale].activer = 1;
  }
  ngOnInit() {
    setInterval(() => {
      this._activation.alert().then( res => {
        this.listeAbonner =JSON.parse(res['_body']);
       
        if(this.listeAbonner['code'] == 1){
          this.listeAlert = this.listeAbonner['message'];
          this.playNotif = 1;
          for(let l of this.listeAbonner['message']){
            //this.listeAlert.push(JSON.parse(l.requete),l.id,l.activer,l.dateAbonnement);
            
          }
          console.log(this.listeAlert);
          
        }
        if(this.playNotif == 1){
          this.audio = new Audio();
          this.audio.src ='./assets/windows-8-sms.mp3';
          this.audio.play();  
        }
        
       //console.log(this.listeAbonner);
    });
      
    }, 10000);
    
   
  }
  getInfo1(requete,nom){
    let req = JSON.parse(requete);
    if(nom == "requete"){
      return req.requete;
    }
    if(nom == "nom"){
      return req.nom ;
    }
    if(nom == "prenom"){
      return req.prenom; 
    }
    if(nom == "tel"){
      return req.tel; 
    }
    if(nom == "NumAbonner"){
      return req.NumAbonner; 
    }
    if(nom == "NumDecoudeur"){
      return req.NumDecoudeur; 
    }
    if(nom == "Formule"){
      return req.Formule; 
    }
    if(nom == "prix"){
      return req.prix ;
    }
    if(nom == "nombreMois"){
      return req.nombreMois ;
    }
    if(nom == "charme"){
      return req.charme ;
    }
    if(nom == "numCarte"){
      return req.numCarte ;
    }
    if(nom == "pvr"){
      return req.pvr ;
    }
    if(nom == "deuxiemeEcran"){
      return req.deuxiemeEcran ;
    }
    if(nom == "titre"){
      return req.titre ;
    }
    if(nom == "cni"){
      return req.cni ;
    }
    if(nom == "ville"){
      return req.ville ;
    }
    if(nom == "adresse"){
      return req.adresse ;
    }
    if(nom == "email"){
      return req.email ;
    }
    
    

    return "null";
  }


}

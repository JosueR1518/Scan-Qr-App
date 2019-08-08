import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataStorageService } from '../../services/data-storage.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{



 optionsSlide={
  allowSlidePrev:false,
  allowSlideNext:false,
  freeMode:true
 };



  constructor(
    private barcodeScanner:BarcodeScanner,
    private dataStorage:DataStorageService,
    private navCtrl:NavController){

    
  }


  ionViewWillEnter(){



  }

  ionViewDidEnter(){
   this.leerQR();


  }

  leerQR(){


    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);



      if(!barcodeData.cancelled){
           const registro =  this.dataStorage.guardarRegistro(barcodeData.format,barcodeData.text);
           this.navCtrl.navigateForward('/tabs/tab2')
           this.dataStorage.abrirRegistro(registro);
      } 



     }).catch(err => {
         console.log('Error', err);
     });

  }


  ngOnInit(): void {
  }

}

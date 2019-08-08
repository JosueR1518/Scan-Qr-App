import { Component } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { Registro } from '../../Models/registro.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  constructor(public dataStorage:DataStorageService){

  }


  enviarCorreo(){
    this.dataStorage.enviarCorreo();


  }


  abrirRegistro(registro:Registro){

      this.dataStorage.abrirRegistro(registro);
    
  }
}

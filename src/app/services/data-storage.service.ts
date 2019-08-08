import { Injectable } from '@angular/core';
import { Registro } from '../Models/registro.model';

import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {



  registros:Registro[]=[];

  constructor(
    private storage: Storage,
    private iab: InAppBrowser,
    private navCtrl:NavController,
    private file: File,
    private emailComposer: EmailComposer) {


    this.cargaStorage();
   }






   guardarRegistro(format:string,texto:string){


    //await this.cargaStorage(); 

    const registro = new Registro(format,texto);
    this.registros.unshift(registro);
    this.guardarStorage();


    return registro;
  }



   guardarStorage(){


      // set a key/value
      this.storage.set('registros', this.registros);


  }

 async cargaStorage(){
  // Or to get a key/value pair
    this.registros = (await  this.storage.get('registros')) || [];

  }


  abrirRegistro(registro:Registro){


    switch(registro.type){


      case 'http':
       this.iab.create(registro.text,'_system');
      break;


      case 'geo':

      this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
      break;


  }
  }


  enviarCorreo(){


    const tempData =[];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    tempData.push(titulos);
    this.registros.forEach(reg=>{
    const linea = `${reg.type}, ${reg.format}, ${reg.created}, ${reg.text.replace(',','')}\n`;
    
      tempData.push(linea);
  });



    console.log(tempData.join(''));


    this.crearArchivoFisico(tempData.join(''));
  }


  private crearArchivoFisico(text:string){

      this.file.checkFile(this.file.dataDirectory,'registros.csv').
          then(existe=>this.escribirEnArchivo(text))
          .catch(err=>{
            return this.file.createFile(this.file.dataDirectory,'registros.csv',false)
            .then(creado=> this.escribirEnArchivo(text))
            .catch(err2=>console.log('No se pudo crear el archivo',err2));
      });


  }


  private async escribirEnArchivo(text:string){

    await this.file.writeExistingFile(this.file.dataDirectory,'registros.csv',text);


    const archivo = `${this.file.dataDirectory}registros.csv`;

    const email = {
      to: 'alexandermejialopez@gmail.com',
    //  cc: 'erika@mustermann.de',
     // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [archivo ],
      subject: 'Backups  de Scans By Josue',
      body: 'Aquì adjunto tus scans',
      isHtml: true
    }
    
    // Send a text message using default options
    this.emailComposer.open(email);

  }

}

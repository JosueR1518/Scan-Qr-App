export class Registro{

public format:string;
text:string;
type:string;
icon:string;
created:Date;

constructor(format:string,texto:string){

this.created = new Date();
this.format  = format;
this.text    = texto;

this.determinarTipo();


}



private determinarTipo(){

    const inicioTexto = this.text.slice(0,4);

    console.log(inicioTexto);

    switch(inicioTexto){


        case 'http':
        this.type = 'http';
        this.icon = 'globe';
        break;


        case 'geo:':
        this.type = 'geo';
        this.icon = 'pin';
        break;


        default:
        this.type = 'No reconocido';
        this.icon = 'create';
        break;
    }


}

}
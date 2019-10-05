import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  destinos: DestinoViaje[];
  constructor() {
    this.destinos = [];
   }

  ngOnInit() {
  }
  guardar(nombre:string, url:string):boolean{
    this.destinos.push(new DestinoViaje(nombre,url))
    //console.log(this.destinos);
    
    return false // al presionar enviar en el formulario la respuesta de javascript es recargar la pagina 
    // por lo tanto la respuesta debe ser false para q no se recargue
  }

  elegido(d:DestinoViaje){
    this.destinos.forEach(function(x){x.setSelected(false)});
    d.setSelected(true);
    // en teoria con esto lo q se selecciones en el html lista-destinos esta funcion
    // el array y desseleccionara todo excepto lo q habiamos elegido
  }
}

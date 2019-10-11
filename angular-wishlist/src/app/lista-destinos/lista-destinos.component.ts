import { Component,EventEmitter, Output, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from './../models/destinos-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  //destinos: DestinoViaje[];
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  //constructor() {
  //  this.destinos = [];
  
  constructor(private destinosApiClient:DestinosApiClient) {
    this.onItemAdded = new EventEmitter();
   }

  ngOnInit() {
  }
  agregado(d:DestinoViaje){
    //let d = new DestinoViaje(nombre, url);
    //this.destinos.push(new DestinoViaje(nombre,url))
    //console.log(this.destinos);
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    //return false // al presionar enviar en el formulario la respuesta de javascript es recargar la pagina 
    // por lo tanto la respuesta debe ser false para q no se recargue
  }

  elegido(e:DestinoViaje){
    //this.destinos.forEach(function(x){x.setSelected(false)});
    this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    e.setSelected(true);
    // en teoria con esto lo q se selecciones en el html lista-destinos esta funcion
    // el array y desseleccionara todo excepto lo q habiamos elegido
  }
}

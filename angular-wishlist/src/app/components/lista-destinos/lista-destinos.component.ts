import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { DestinosApiClient } from './../../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.module';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [ DestinosApiClient ]
})
export class ListaDestinosComponent implements OnInit {
  // destinos: DestinoViaje[];
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string [];
  all;
  // constructor() {
  //  this.destinos = [];

  constructor(private destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito).subscribe(d => {
          if (d != null) {
            this.updates.push('Se ha elegido a ' + d.nombre);
          }
        });
    store.select(state => state.destinos.items).subscribe(items => this.all = items);
   }

  ngOnInit() {
  }

  agregado(d: DestinoViaje) {
    // let d = new DestinoViaje(nombre, url);
    // this.destinos.push(new DestinoViaje(nombre,url))
    // console.log(this.destinos);
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    // return false // al presionar enviar en el formulario la respuesta de javascript es recargar la pagina
    // por lo tanto la respuesta debe ser false para q no se recargue
    // this.store.dispatch(new NuevoDestinoAction(d));
  }

  elegido(e: DestinoViaje) {
    // this.destinos.forEach(function(x){x.setSelected(false)});
    this.destinosApiClient.elegir(e);
    e.setSelected(true);
    // en teoria con esto lo q se selecciones en el html lista-destinos esta funcion
    // el array y desseleccionara todo excepto lo q habiamos elegido
    // this.store.dispatch(new ElegidoFavoritoAction(e));
  }
}

import { DestinoViaje } from './destino-viaje.model';
import {
  NuevoDestinoAction,
  ElegidoFavoritoAction
} from './destinos-viajes-state.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinosApiClient {
destinos: DestinoViaje[] = [];
// current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

constructor(private store: Store<AppState>) {
// this.destinos = [];

}
add(d: DestinoViaje) {
// this.destinos.push(d);
this.store.dispatch(new NuevoDestinoAction(d));
}
getAll(): DestinoViaje[] {
return this.destinos;
}

getById(id: string): DestinoViaje {
// tslint:disable-next-line: only-arrow-functions
return this.destinos.filter(function(d) {return d.id.toString() === id; })[0];
}


elegir(d: DestinoViaje) {
    // aqui incovariamos al servidor
// this.destinos.forEach(x => x.setSelected(false));
// d.setSelected(true);
// this.current.next(d);
this.store.dispatch(new ElegidoFavoritoAction(d));
  }

// SubscribeOnChange(fn) {
// this.current.subscribe(fn);
// }


}

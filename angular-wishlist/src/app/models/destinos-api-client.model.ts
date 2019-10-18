import { DestinoViaje } from './destino-viaje.model';
import {
  NuevoDestinoAction,
  ElegidoFavoritoAction
} from './destinos-viajes-state.model';
import { Store } from '@ngrx/store';
import { AppState, APP_CONFIG, AppConfig, db } from '../app.module';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpRequest, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class DestinosApiClient {
destinos: DestinoViaje[] = [];
// current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

constructor(
  private store: Store<AppState>,
  @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
  private http: HttpClient
) {
// this.destinos = [];

}
add(d: DestinoViaje) {
  const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
  // tslint:disable-next-line: object-literal-shorthand
  const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
  this.http.request(req).subscribe((data: HttpResponse<{}>) => {
    if (data.status === 200) {
      this.store.dispatch(new NuevoDestinoAction(d));
      const myDb = db;
      myDb.destinos.add(d);
      console.log('todos los destinos de la db!');
      myDb.destinos.toArray().then(destinos => console.log(destinos));
  }
  });
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

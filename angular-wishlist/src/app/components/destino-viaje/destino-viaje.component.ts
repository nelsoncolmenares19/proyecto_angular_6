import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.module';
import { VoteUpAction, VoteDownAction, ElegidoFavoritoAction } from './../../models/destinos-viajes-state.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('3s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ]),
    ])
  ]
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: DestinoViaje;
  // tslint:disable-next-line: no-input-rename
  @Input('idx') position: number; // esta var permitira mostrar la posicion 'idx' renombra
  // la variable position y en el html ahora se debe usar idx en vez de position
  @HostBinding('attr.class') cssClass = 'col-md-4';
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClicked: EventEmitter<DestinoViaje>;
  // evento de la clase de angular
  constructor(private store: Store<AppState>) {
    // se inicia la variable clicked dentro del constructor
    this.onClicked = new EventEmitter();
  }
  ngOnInit() {
  }

  ir() {
    // this.onClicked.emit(this.destino);
    // console.log(this.destino.selected);
    this.store.dispatch(new ElegidoFavoritoAction(this.destino));
    return false;
    // este es un metodo que se ejecuta dentro del mismo componente por lo tanto
    // se define en el .ts que corresponde al mismo componente que controla el html
    // se retorna false ya que sino el navegador se recargada pero no queremos eso
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }
}

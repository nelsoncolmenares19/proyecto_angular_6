import { Component, OnInit, Input, HostBinding,EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';


@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: DestinoViaje;
  @Input('idx') position: number; // esta var permitira mostrar la posicion 'idx' renombra
  //la variable position y en el html ahora se debe usar idx en vez de position
  @HostBinding('attr.class') cssClass='col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;
  // evento de la clase de angular
  constructor() { 
    // se inicia la variable clicked dentro del constructor
    this.clicked = new EventEmitter();
  }
  ngOnInit() {
  }

  ir(){
    this.clicked.emit(this.destino);
    return false
    // este es un metodo que se ejecuta dentro del mismo componente por lo tanto
    // se define en el .ts que corresponde al mismo componente que controla el html
    // se retorna false ya que sino el navegador se recargada pero no queremos eso
  }
}

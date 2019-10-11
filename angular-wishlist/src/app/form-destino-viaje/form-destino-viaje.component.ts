import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg : FormGroup;
  constructor(fb:FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre :[''],
      url:['']
    });
    this.fg.valueChanges.subscribe((form:any) =>{
      console.log('cambio el formulario:', form)
    })
  }

  ngOnInit() {
  }

  guardar(nombre:string,url:string):boolean{
    const d = new DestinoViaje(nombre, url);
    //this.destinos.push(new DestinoViaje(nombre,url))
    //console.log(this.destinos);
    //this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    console.log(d)
    return false; // al presionar enviar en el formulario la respuesta de javascript es recargar la pagina 
    // por lo tanto la respuesta debe ser false para q no se recargue
  }

}

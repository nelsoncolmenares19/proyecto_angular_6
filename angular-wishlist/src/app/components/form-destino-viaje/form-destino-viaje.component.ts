import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
// import { DestinosApiClient } from './../models/destinos-api-client.model';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css'],
})
export class FormDestinoViajeComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud = 3;
  searchResults: string[];



  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre : ['', Validators.compose([
        Validators.required,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    });
    this.fg.valueChanges.subscribe((form: any) => {
      console.log('cambio el formulario:', form );
    });
  }

  ngOnInit() {
    const elemNombre =  document.getElementById('nombre') as HTMLInputElement;
    fromEvent(elemNombre, 'input')
    .pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(120),
      distinctUntilChanged(),
      switchMap(() => ajax('/assets/datos.json'))
    ).subscribe(ajaxResponse => this.searchResults = ajaxResponse.response);
  }

  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    // this.destinos.push(new DestinoViaje(nombre,url))
    // console.log(this.destinos);
    // this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    console.log(d);
    return false; // al presionar enviar en el formulario la respuesta de javascript es recargar la pagina
    // por lo tanto la respuesta debe ser false para q no se recargue
  }

  nombreValidator(control: FormControl): {[s: string]: boolean} {
    const l = control.value.toString().trim().length;
    if (l > 0 && l < 5) {
      return {invalidNombre: true };
    }
    return null;

  }

  nombreValidatorParametrizable(minLongitud: number): ValidatorFn {
    return ( control: FormControl ): {[s: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
      if (l > 0 && l < minLongitud) {
      return {minLongNombre: true };
    }
      return null;
    };
  }




}

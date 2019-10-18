import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vuelos-detalle',
  templateUrl: './vuelos-detalle.component.html',
  styleUrls: ['./vuelos-detalle.component.css']
})
export class VuelosDetalleComponent implements OnInit {
  id: any;

  constructor(private route: ActivatedRoute) {
    // tslint:disable-next-line: no-string-literal
    route.params.subscribe(params => { this.id = params['id']; });
  }
  ngOnInit() {
  }

}

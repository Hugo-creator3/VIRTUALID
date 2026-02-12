import { Component } from '@angular/core';
import { NabvarFunctions } from '../../shared/nabvar-functions/nabvar-functions';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-configuracion',
  imports: [FormsModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion {

  bloqueoIntentos: boolean = true;
  bloqueoTiempo: boolean = true;
  geoActiva: boolean = true;

}

import { Component } from '@angular/core';
import { NabvarFunctions } from '../../shared/nabvar-functions/nabvar-functions';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-configuracion',
  imports: [NabvarFunctions, RouterOutlet],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion {

}

import { Component } from '@angular/core';
import { NabvarFunctions } from '../../shared/nabvar-functions/nabvar-functions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-asistencias',
  imports: [NabvarFunctions, RouterOutlet],
  templateUrl: './asistencias.html',
  styleUrl: './asistencias.css',
})
export class Asistencias {

}

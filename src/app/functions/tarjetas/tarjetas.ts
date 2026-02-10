import { Component } from '@angular/core';
import { NabvarFunctions } from '../../shared/nabvar-functions/nabvar-functions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  imports: [NabvarFunctions, RouterOutlet],
  templateUrl: './tarjetas.html',
  styleUrl: './tarjetas.css',
})
export class Tarjetas {

}

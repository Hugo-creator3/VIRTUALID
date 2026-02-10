import { Component } from '@angular/core';
import { NabvarFunctions } from '../../shared/nabvar-functions/nabvar-functions';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-reportes',
  imports: [NabvarFunctions, RouterOutlet],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes {

}

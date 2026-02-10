import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterOutlet } from '@angular/router';
import { Nabvar } from '../../shared/nabvar/nabvar';


@Component({
  selector: 'app-conocenos',
  standalone: true,
  imports: [RouterOutlet, Nabvar],
  templateUrl: './conocenos.html',
  styleUrl: './conocenos.css',
})
export class Conocenos {

}

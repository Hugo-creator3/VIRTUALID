import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NabvarFunctions } from '../../shared/nabvar-functions/nabvar-functions';


@Component({
  selector: 'app-lista-usuarios',
  imports: [NabvarFunctions, RouterOutlet],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios {

}

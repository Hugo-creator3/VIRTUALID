import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterModule],
  templateUrl: './nabvar.html',
  styleUrl: './nabvar.css',
})
export class Nabvar {

}

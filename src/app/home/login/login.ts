import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, RouterLinkActive, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ RouterModule, CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '20233L001039@utcv.edu.mx';
  password: string = '123456789 ';

  constructor(private router: Router) {}

  login() {
    if (this.email && this.password) {
      this.router.navigate(['/panel-control']);
    } else {
      alert('Por favor llena todos los campos');
    }
  }
  
  irRegistro() {
  this.router.navigate(['/registro']);
}


}

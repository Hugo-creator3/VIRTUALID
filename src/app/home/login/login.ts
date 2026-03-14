import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ RouterModule, CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '20233L001039@utcv.edu.mx';
  password: string = '123456789 ';

  constructor(
    private router: Router,
    private auth: AuthService

  ) {}

  
login(){

  this.auth.login({

    email:this.email,
    password:this.password

  }).subscribe((res:any)=>{

    localStorage.setItem("token",res.token)

    this.router.navigate(['/panel-control'])

  })
}

  irRegistro() {
  this.router.navigate(['/registro']);
}


}

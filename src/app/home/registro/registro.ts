import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  form = {
    email: '',
    nombre: '',
    contrasena: '',
    repetirContrasena: '',
    cargo: '',
    telefono: '',
    nombreEmpresa: '',
    codigoEmpresa: ''
  };

  empresa = { nombre: '', razon_social: '', rfc: '', tipoDeInstitucion: '' };
  proyecto = { nombre: '', descripcion: '' };

  showPass   = false;
  showPass2  = false;
  panelOpen  = false;
  panelTipo: 'empresa' | 'proyecto' = 'empresa';

  constructor(
  private router: Router,
  private auth: AuthService
  ) {}

  togglePanel(): void {
    this.panelOpen = !this.panelOpen;
  }

guardarPanel(): void {

  if (this.panelTipo === 'empresa') {

    this.auth.crearEmpresa(this.empresa)
      .subscribe((res:any)=>{

        alert("Clave generada: " + res.clave_segura)

        this.form.codigoEmpresa = res.clave_segura

      })

  }

}
registrar(): void {

  if (this.form.contrasena !== this.form.repetirContrasena) {
    alert("Contraseñas no coinciden")
    return
  }

  const data = {

    email: this.form.email,
    nombre: this.form.nombre,
    password: this.form.contrasena,
    cargo: this.form.cargo,
    codigoEmpresa: this.form.codigoEmpresa

  }

  this.auth.registrarAdmin(data)
    .subscribe(()=>{

      alert("Usuario creado")

      this.router.navigate(['/login'])

    })

}

  irLogin(): void {
    this.router.navigate(['/login']);
  }
}
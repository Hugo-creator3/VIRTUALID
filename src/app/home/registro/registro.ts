import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface FormErrors {
  email?: string;
  nombre?: string;
  contrasena?: string;
  repetirContrasena?: string;
  cargo?: string;
  telefono?: string;
  codigoEmpresa?: string;
}

interface EmpresaErrors {
  nombre?: string;
  razon_social?: string;
  rfc?: string;
  tipoDeInstitucion?: string;
}

interface ProyectoErrors {
  nombre?: string;
  descripcion?: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  empresa  = { nombre: '', razon_social: '', rfc: '', tipoDeInstitucion: '' };
  proyecto = { nombre: '', descripcion: '' };

  showPass  = false;
  showPass2 = false;
  panelOpen = false;
  panelTipo: 'empresa' | 'proyecto' = 'empresa';

  // ── Estado de validación ───────────────────────────────────────────────────
  errors:        FormErrors    = {};
  empresaErrors: EmpresaErrors = {};
  proyectoErrors: ProyectoErrors = {};
  touched:       Record<string, boolean> = {};
  isLoading      = false;
  serverError    = '';
mostrarCodigo = false
codigo = ''
cuentaCreada = false

  constructor(
    private router: Router,
    private auth:   AuthService
  ) {}

  // ── Helpers template ───────────────────────────────────────────────────────
  markTouched(field: string, scope: 'form' | 'empresa' | 'proyecto' = 'form'): void {
    this.touched[`${scope}.${field}`] = true;
    this.validateField(field, scope);
  }

  hasError(field: string, scope: 'form' | 'empresa' | 'proyecto' = 'form'): boolean {
    return !!(this.touched[`${scope}.${field}`] && this.getError(field, scope));
  }

  getError(field: string, scope: 'form' | 'empresa' | 'proyecto' = 'form'): string {
    if (scope === 'empresa')  return this.empresaErrors[field  as keyof EmpresaErrors]  ?? '';
    if (scope === 'proyecto') return this.proyectoErrors[field as keyof ProyectoErrors] ?? '';
    return this.errors[field as keyof FormErrors] ?? '';
  }

  // ── Validación por campo ───────────────────────────────────────────────────
  validateField(field: string, scope: 'form' | 'empresa' | 'proyecto' = 'form'): void {

    if (scope === 'empresa') {
      switch (field) {
        case 'nombre':
          this.empresaErrors.nombre = !this.empresa.nombre.trim()
            ? 'El nombre de empresa es requerido.'
            : this.empresa.nombre.trim().length < 2
              ? 'Mínimo 2 caracteres.' : undefined;
          break;
        case 'razon_social':
          this.empresaErrors.razon_social = !this.empresa.razon_social.trim()
            ? 'La razón social es requerida.' : undefined;
          break;
        case 'rfc':
          if (!this.empresa.rfc.trim()) {
            this.empresaErrors.rfc = 'El RFC es requerido.';
          } else if (!/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i.test(this.empresa.rfc.trim())) {
            this.empresaErrors.rfc = 'Formato RFC inválido (ej. ACM010101XXX).';
          } else { delete this.empresaErrors.rfc; }
          break;
        case 'tipoDeInstitucion':
          this.empresaErrors.tipoDeInstitucion = !this.empresa.tipoDeInstitucion.trim()
            ? 'El tipo de institución es requerido.' : undefined;
          break;
      }
      return;
    }

    if (scope === 'proyecto') {
      switch (field) {
        case 'nombre':
          this.proyectoErrors.nombre = !this.proyecto.nombre.trim()
            ? 'El nombre del proyecto es requerido.'
            : this.proyecto.nombre.trim().length < 3
              ? 'Mínimo 3 caracteres.' : undefined;
          break;
        case 'descripcion':
          this.proyectoErrors.descripcion = !this.proyecto.descripcion.trim()
            ? 'La descripción es requerida.' : undefined;
          break;
      }
      return;
    }

    // scope === 'form'
    switch (field) {

      case 'email':
        if (!this.form.email.trim()) {
          this.errors.email = 'El correo es requerido.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.form.email.trim())) {
          this.errors.email = 'Ingresa un correo válido.';
        } else { delete this.errors.email; }
        break;

      case 'nombre':
        if (!this.form.nombre.trim()) {
          this.errors.nombre = 'El nombre es requerido.';
        } else if (this.form.nombre.trim().length < 3) {
          this.errors.nombre = 'Mínimo 3 caracteres.';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/.test(this.form.nombre.trim())) {
          this.errors.nombre = 'Solo letras y espacios.';
        } else { delete this.errors.nombre; }
        break;

      case 'contrasena':
        if (!this.form.contrasena) {
          this.errors.contrasena = 'La contraseña es requerida.';
        } else if (this.form.contrasena.length < 8) {
          this.errors.contrasena = 'Mínimo 8 caracteres.';
        } else if (!/[A-Z]/.test(this.form.contrasena)) {
          this.errors.contrasena = 'Debe incluir al menos una mayúscula.';
        } else if (!/[0-9]/.test(this.form.contrasena)) {
          this.errors.contrasena = 'Debe incluir al menos un número.';
        } else { delete this.errors.contrasena; }
        // re-validar confirmación si ya fue tocada
        if (this.touched['form.repetirContrasena']) this.validateField('repetirContrasena');
        break;

      case 'repetirContrasena':
        if (!this.form.repetirContrasena) {
          this.errors.repetirContrasena = 'Confirma tu contraseña.';
        } else if (this.form.repetirContrasena !== this.form.contrasena) {
          this.errors.repetirContrasena = 'Las contraseñas no coinciden.';
        } else { delete this.errors.repetirContrasena; }
        break;

      case 'cargo':
        if (!this.form.cargo.trim()) {
          this.errors.cargo = 'El cargo es requerido.';
        } else if (this.form.cargo.trim().length < 2) {
          this.errors.cargo = 'Mínimo 2 caracteres.';
        } else { delete this.errors.cargo; }
        break;

      case 'telefono':
        const tel = this.form.telefono.replace(/[\s\-]/g, '');
        if (!tel) {
          this.errors.telefono = 'El teléfono es requerido.';
        } else if (!/^\+?[0-9]{7,15}$/.test(tel)) {
          this.errors.telefono = 'Número inválido (7–15 dígitos).';
        } else { delete this.errors.telefono; }
        break;

      case 'codigoEmpresa':
        if (this.form.codigoEmpresa && !/^[a-zA-Z0-9_-]+$/.test(this.form.codigoEmpresa.trim())) {
          this.errors.codigoEmpresa = 'Solo letras, números, guiones y guiones bajos.';
        } else { delete this.errors.codigoEmpresa; }
        break;
    }
  }

  // ── Validar todo el form principal ────────────────────────────────────────
  private validateAll(): boolean {
    const campos = ['email', 'nombre', 'contrasena', 'repetirContrasena', 'cargo', 'telefono', 'codigoEmpresa'];
    campos.forEach(f => { this.touched[`form.${f}`] = true; this.validateField(f); });
    return Object.keys(this.errors).length === 0;
  }

  // ── Validar panel empresa ─────────────────────────────────────────────────
  private validateEmpresa(): boolean {
    ['nombre', 'razon_social', 'rfc', 'tipoDeInstitucion'].forEach(f => {
      this.touched[`empresa.${f}`] = true;
      this.validateField(f, 'empresa');
    });
    return Object.keys(this.empresaErrors).filter(k =>
      this.empresaErrors[k as keyof EmpresaErrors]
    ).length === 0;
  }

  // ── Validar panel proyecto ────────────────────────────────────────────────
  private validateProyecto(): boolean {
    ['nombre', 'descripcion'].forEach(f => {
      this.touched[`proyecto.${f}`] = true;
      this.validateField(f, 'proyecto');
    });
    return Object.keys(this.proyectoErrors).filter(k =>
      this.proyectoErrors[k as keyof ProyectoErrors]
    ).length === 0;
  }

  // ── Fortaleza de contraseña ───────────────────────────────────────────────
  get passwordStrength(): number {
    if (!this.form.contrasena) return 0;
    let s = 0;
    if (this.form.contrasena.length >= 8)  s++;
    if (/[A-Z]/.test(this.form.contrasena) && /[a-z]/.test(this.form.contrasena)) s++;
    if (/[0-9]/.test(this.form.contrasena)) s++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(this.form.contrasena)) s++;
    return s;
  }

  get passwordStrengthLabel(): string {
    return ['', 'Débil', 'Regular', 'Buena', 'Fuerte'][this.passwordStrength] ?? '';
  }

  get passwordStrengthClass(): string {
    return ['', 'weak', 'fair', 'good', 'strong'][this.passwordStrength] ?? '';
  }

  // ── togglePanel() — intacto ───────────────────────────────────────────────
  togglePanel(): void {
    this.panelOpen = !this.panelOpen;
  }

  // ── guardarPanel() — intacto, solo con validación previa ─────────────────
  guardarPanel(): void {
    if (this.panelTipo === 'empresa' && !this.validateEmpresa()) return;
    if (this.panelTipo === 'proyecto' && !this.validateProyecto()) return;

    if (this.panelTipo === 'empresa') {
      this.auth.crearEmpresa(this.empresa).subscribe((res: any) => {
        alert('Clave generada: ' + res.clave_segura);
        this.form.codigoEmpresa = res.clave_segura;
      });
    }
  }

 registrar(): void {

  this.serverError = ''

  if (!this.validateAll()) return

  this.isLoading = true

  this.auth.enviarCodigo({
    email: this.form.email
  }).subscribe({

    next: () => {

      this.isLoading = false

      this.mostrarCodigo = true

    },

    error: (err:any) => {

      this.isLoading = false

      this.serverError =
        err?.error?.message || 'Error'

    }

  })

}

verificarCodigo(): void {

  this.isLoading = true

  const data = {

    email: this.form.email,
    nombre: this.form.nombre,
    password: this.form.contrasena,
    cargo: this.form.cargo,
    codigoEmpresa: this.form.codigoEmpresa,
    codigo: this.codigo

  }

  this.auth.verificarCodigo(data).subscribe({

    next: () => {

      this.isLoading = false

      this.cuentaCreada = true

      this.mostrarCodigo = false

    },

    error: (err:any) => {

      this.isLoading = false

      this.serverError =
        err?.error?.message || 'Código inválido'

    }

  })

}
  // ── irLogin() — intacto ───────────────────────────────────────────────────
  irLogin(): void {
    this.router.navigate(['/login']);
  }
}
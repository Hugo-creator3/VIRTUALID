import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface FormErrors {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string    = '';
  password: string = '';

  // ── Estado UI ──────────────────────────────────────────────────────────────
  showPassword = false;
  isLoading    = false;
  serverError  = '';

  // ── Validación ─────────────────────────────────────────────────────────────
  errors: FormErrors = {};
  touched: Record<string, boolean> = {};

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  // ── Helpers públicos para el template ─────────────────────────────────────
  markTouched(field: string): void {
    this.touched[field] = true;
    this.validateField(field);
    this.serverError = ''; // limpiar error del server al volver a escribir
  }

  hasError(field: string): boolean {
    return !!(this.touched[field] && this.errors[field as keyof FormErrors]);
  }

  errorMsg(field: string): string {
    return this.errors[field as keyof FormErrors] ?? '';
  }

  // ── Validación por campo ───────────────────────────────────────────────────
  private validateField(field: string): void {
    switch (field) {
      case 'email':
        if (!this.email.trim()) {
          this.errors.email = 'El correo es requerido.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.email.trim())) {
          this.errors.email = 'Ingresa un correo electrónico válido.';
        } else {
          delete this.errors.email;
        }
        break;

      case 'password':
        if (!this.password) {
          this.errors.password = 'La contraseña es requerida.';
        } else if (this.password.trim().length < 6) {
          this.errors.password = 'Mínimo 6 caracteres.';
        } else {
          delete this.errors.password;
        }
        break;
    }
  }

  private validateAll(): boolean {
    ['email', 'password'].forEach(f => {
      this.touched[f] = true;
      this.validateField(f);
    });
    return Object.keys(this.errors).length === 0;
  }

  // ── submitLogin — envuelve login() sin modificarlo ─────────────────────────
  submitLogin(): void {
    this.serverError = '';

    if (!this.validateAll()) return;

    this.isLoading = true;
    this.login();
  }

  // ── login() — intacto ──────────────────────────────────────────────────────
  login(): void {
    this.auth.login({
      email:    this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/panel-control']);
      },
      error: (err: any) => {
        this.isLoading   = false;
        this.serverError = err?.error?.message ?? 'Credenciales incorrectas. Intenta de nuevo.';
      }
    });
  }

  // ── irRegistro() — intacto ─────────────────────────────────────────────────
  irRegistro(): void {
    this.router.navigate(['/registro']);
  }
}
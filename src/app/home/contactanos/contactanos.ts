import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contactanos.html',
  styleUrl: './contactanos.css',
})
export class Contactanos {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulario enviado:', this.contactForm.value);
      
      alert('¡Mensaje enviado con éxito! Te responderemos pronto.');
      
      this.contactForm.reset();
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  get nombre() {
    return this.contactForm.get('nombre');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get mensaje() {
    return this.contactForm.get('mensaje');
  }
}
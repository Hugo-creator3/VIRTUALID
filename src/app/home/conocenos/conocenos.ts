import { Component, OnInit, HostListener } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterOutlet } from '@angular/router';
import { Nabvar } from '../../shared/nabvar/nabvar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conocenos',
  standalone: true,
  imports: [RouterOutlet, Nabvar, CommonModule],
  templateUrl: './conocenos.html',
  styleUrl: './conocenos.css',
})
export class Conocenos implements OnInit {
  currentSection: number = 0;
  
  // Lista de ventajas
  ventajas = [
    {
      icon: '🔒',
      title: 'Seguridad Avanzada',
      description: 'Autenticación biométrica y códigos dinámicos que garantizan la protección de tu identidad digital.'
    },
    {
      icon: '⚡',
      title: 'Agilidad en Procesos',
      description: 'Elimina trámites burocráticos y reduce tiempos de espera significativamente.'
    },
    {
      icon: '🌍',
      title: 'Acceso desde Cualquier Lugar',
      description: 'Geolocalización integrada para validar tu identidad donde lo necesites.'
    },
    {
      icon: '♻️',
      title: 'Ecológico y Sostenible',
      description: 'Elimina el uso de papel y contribuye al cuidado del medio ambiente.'
    },
    {
      icon: '💰',
      title: 'Ahorro de Costos',
      description: 'Reduce gastos operativos y de impresión en tu organización.'
    },
    {
      icon: '📱',
      title: 'Multiplataforma',
      description: 'Disponible en dispositivos móviles, tablets y computadoras.'
    }
  ];

  ngOnInit(): void {
    // Inicializar animaciones o configuraciones si es necesario
  }

  // Navegar a una sección específica
  scrollToSection(index: number): void {
    this.currentSection = index;
    const sections = document.querySelectorAll('.section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Detectar scroll para actualizar indicadores
  @HostListener('window:scroll')
  onScroll(): void {
    const mainContainer = document.querySelector('.main-container');
    const sections = document.querySelectorAll('.section');
    
    if (mainContainer) {
      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop;
        const sectionHeight = element.clientHeight;
        const scrollTop = mainContainer.scrollTop;
        
        if (scrollTop >= sectionTop - sectionHeight / 3) {
          this.currentSection = index;
        }
      });
    }
  }

  // Método para el botón comenzar
  comenzar(): void {
    console.log('Comenzar clicked');
    // Aquí puedes agregar la lógica de navegación o acción
    // Por ejemplo: this.router.navigate(['/registro']);
  }
}
import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-notificaciones',
  standalone: true,
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css',
    imports: [CommonModule] // 👈 ESTO ES LA CLAVE

})
export class Notificaciones implements OnInit {

  notificaciones$!: Observable<any[]>; // 👈 observable

  constructor(private notifService: NotificacionesService) {}

  ngOnInit(): void {
    this.notificaciones$ = this.notifService.getNotificaciones();
  }
}
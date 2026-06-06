// panel-control.ts
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../../services/auth.service'
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { finalize, switchMap, startWith } from 'rxjs/operators';
import { PanelService } from '../../../services/panel.service';
import { FormsModule } from '@angular/forms'

interface VirtualiaMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-panel-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-control.html',
  styleUrls: ['./panel-control.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PanelControl implements OnInit, OnDestroy {

  panel$!: Observable<any>
  dashboard$!: Observable<any>
  usuariosEstadisticas$!: Observable<any>
  config: any = {

  hora_entrada: '08:00',
  hora_salida: '18:00',
  tolerancia_minutos: 10,
  max_usuarios: 10,
  checkin_habilitado: true,

 

};

  tipoReporte: string = 'asistencia'
  reporteFechaInicio: string = ''
  reporteFechaFin: string = ''
  reportePeriodo: string = 'mes_actual'
  reporteDepartamento: string = 'todos'
  reporteFormato: string = 'xlsx'

  admins: any[] = [] ; 
  activeSection: string = 'dashboard'
  sidebarCollapsed: boolean = false
  currentTime: string = ''
  virtualiaQuestion: string = ''
  virtualiaLoading: boolean = false
  virtualiaMessages: VirtualiaMessage[] = [
    {
      role: 'assistant',
      content: 'Hola, soy Virtualia. Puedo ayudarte a analizar asistencias, retrasos, faltas, rankings, cumplimiento y configuracion de ubicaciones de tu empresa.'
    }
  ]

  saveStatus = {
    accesos: false,
    configuracion: false
  }

  private clockSub!: Subscription
  private refreshSub!: Subscription
  private saveTimeouts: Record<'accesos' | 'configuracion', number | null> = {
    accesos: null,
    configuracion: null
  }

  constructor(
    private auth: AuthService,
    private panelService: PanelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      localStorage.setItem('token', token)
      window.history.replaceState({}, document.title, '/')
    }

    this.panel$ = this.auth.getPanel()

   this.dashboard$ = this.panelService.getDashboardLive();
   this.usuariosEstadisticas$ = this.panelService.getUsuariosEstadisticasLive();
    // Reloj en tiempo real
    this.updateTime()
    this.clockSub = interval(1000).subscribe(() => this.updateTime())

    this.panelService.getConfiguracion()
.subscribe(config => {

  if(config) {

    this.config = config;

  }

});

this.panelService.getAdmins()
.subscribe(data => {

  this.admins = data;

});
  }

  ngOnDestroy() {
    this.clockSub?.unsubscribe()
    this.refreshSub?.unsubscribe()

    Object.keys(this.saveTimeouts).forEach((key) => {
      if (this.saveTimeouts[key as 'accesos' | 'configuracion']) {
        window.clearTimeout(this.saveTimeouts[key as 'accesos' | 'configuracion']!)
      }
    })
  }

  updateTime() {
    const now = new Date()
    this.currentTime = now.toLocaleTimeString('es-MX', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    })
  }

  setSection(section: string) {
    this.activeSection = section
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed
  }

  getSectionTitle(): string {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      usuarios: 'Usuarios',
      accesos: 'Accesos',
      reportes: 'Reportes',
      configuracion: 'Configuración',
      virtualia: 'Virtualia'
    }
    return titles[this.activeSection] ?? 'Dashboard'
  }

  getTenantIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Number(payload.institucion);
    } catch {
      return null;
    }
  }

  addVirtualiaMessage(message: VirtualiaMessage) {
    this.virtualiaMessages = [...this.virtualiaMessages, message];
    this.cdr.detectChanges();
  }

  getVirtualiaResponseText(response: any): string {
    if (typeof response === 'string') {
      return response;
    }

    if (typeof response?.respuesta === 'string' && response.respuesta.trim()) {
      return response.respuesta;
    }

    if (typeof response?.answer === 'string' && response.answer.trim()) {
      return response.answer;
    }

    return 'Lo siento, no tengo acceso a esa informacion o no puedo realizar esa accion';
  }

  sendVirtualiaMessage() {
    const question = this.virtualiaQuestion.trim();
    if (!question || this.virtualiaLoading) return;

    this.addVirtualiaMessage({
      role: 'user',
      content: question
    });
    this.virtualiaQuestion = '';
    this.virtualiaLoading = true;
    this.cdr.detectChanges();

    this.panelService
      .sendVirtualiaMessage(question, this.getTenantIdFromToken())
      .pipe(
        finalize(() => {
          this.virtualiaLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Virtualia response:', response);
          this.addVirtualiaMessage({
            role: 'assistant',
            content: this.getVirtualiaResponseText(response)
          });
        },
        error: (error) => {
          console.error('Virtualia error:', error);
          this.addVirtualiaMessage({
            role: 'assistant',
            content: 'Lo siento, no tengo acceso a esa informacion o no puedo realizar esa accion'
          });
        }
      });
  }

  getInitial(mensaje: string): string {
    if (!mensaje) return 'A'
    const match = mensaje.match(/\b(\w)/g)
    return match ? match.slice(0, 2).join('').toUpperCase() : 'A'
  }
refresh() {
  this.dashboard$ = this.panelService.getDashboardLive();
  this.usuariosEstadisticas$ = this.panelService.getUsuariosEstadisticasLive();
}
  /** Altura relativa de barra (0-100) para datos absolutos */
  getBarHeight(value: number, d: any): number {
    const max = Math.max(d.usuarios || 0, d.accesosHoy || 0, d.exitosos || 0, d.fallidos || 0, 1)
    return Math.round((value / max) * 100)
  }

  getYMax(d: any): number {
    return Math.max(d.accesosHoy || 0, d.exitosos || 0, d.fallidos || 0)
  }

  getYMid(d: any): number {
    return Math.round(this.getYMax(d) / 2)
  }

  getCategoriasUsuarios(stats: any): any[] {
    if (!stats?.categorias) return [];

    return Object.entries(stats.categorias).map(([key, value]: [string, any]) => ({
      key,
      ...value
    }));
  }

  getTopRanking(stats: any): any[] {
    return stats?.ranking?.slice(0, 10) || [];
  }

  private showSaveFeedback(section: 'accesos' | 'configuracion') {
    this.saveStatus[section] = true
    this.cdr.detectChanges()

    if (this.saveTimeouts[section]) {
      window.clearTimeout(this.saveTimeouts[section]!)
    }

    this.saveTimeouts[section] = window.setTimeout(() => {
      this.saveStatus[section] = false
      this.cdr.detectChanges()
    }, 2200)
  }

  saveConfig(section: 'accesos' | 'configuracion' = 'configuracion') {
    this.panelService
      .saveConfiguracion(this.config)
      .subscribe(() => {
        this.showSaveFeedback(section)
      })
  }
limpiarFiltrosReporte() {
  this.reporteFechaInicio = ''
  this.reporteFechaFin = ''
  this.reportePeriodo = 'mes_actual'
  this.reporteDepartamento = 'todos'
  this.reporteFormato = 'xlsx'
}
}

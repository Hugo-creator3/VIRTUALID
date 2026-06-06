import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { GeoService } from '../../../services/geo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion implements AfterViewInit, OnDestroy {
  bloqueoIntentos: boolean = true;
  bloqueoTiempo: boolean = true;
  geoActiva: boolean = true;
  map: any;
  marker: any;
  circle: any;
  lat: number = 25.6866;
  lng: number = -100.3161;
  radio: number = 100;
  saveStatus = false;
  private saveTimeout: number | null = null;

  constructor(private geoService: GeoService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.fixLeafletIcons(); // 🔥 Llamada para arreglar iconos
    this.initMap()
    this.loadConfig()
  }
  private fixLeafletIcons() {
    const iconDefault = L.icon({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }
initMap() {
    this.map = L.map('map').setView([this.lat, this.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      this.updateMarker(e.latlng.lat, e.latlng.lng);
    });
  }
  // Función centralizada para mover marcador y círculo
  updateMarker(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;

    if (this.marker) this.map.removeLayer(this.marker);
    if (this.circle) this.map.removeLayer(this.circle);

    this.marker = L.marker([lat, lng]).addTo(this.map);
    
    this.circle = L.circle([lat, lng], {
      radius: this.radio,
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.2
    }).addTo(this.map);
  }

loadConfig() {
  this.geoService.getConfig().subscribe((data:any) => {

    if (!data) return;

    this.updateMarker(data.latitud, data.longitud);

    this.radio = data.radio_metros;

    this.bloqueoIntentos = data.bloqueo_intentos;
    this.bloqueoTiempo = data.bloqueo_horario;

    this.map.setView([this.lat, this.lng], 16);

  });
}

  ngOnDestroy() {
    if (this.saveTimeout) {
      window.clearTimeout(this.saveTimeout)
    }
  }

  private showSaveFeedback() {
    this.saveStatus = true
    this.cdr.detectChanges()

    if (this.saveTimeout) {
      window.clearTimeout(this.saveTimeout)
    }

    this.saveTimeout = window.setTimeout(() => {
      this.saveStatus = false
      this.cdr.detectChanges()
    }, 2200)
  }

  guardar() {
    this.geoService.saveConfig({
      latitud: this.lat,
      longitud: this.lng,
      radio: this.radio
    }).subscribe(() => {
      this.showSaveFeedback()
    })
  }
}


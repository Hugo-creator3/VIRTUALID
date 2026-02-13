import { Component } from '@angular/core';
import { NabvarFunctions } from '../../shared/nabvar-functions/nabvar-functions';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-panel-control',
  imports: [NabvarFunctions, RouterOutlet],
  templateUrl: './panel-control.html',
  styleUrl: './panel-control.css',
})
export class PanelControl {

}

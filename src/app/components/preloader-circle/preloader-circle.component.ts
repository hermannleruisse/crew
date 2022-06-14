import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader-circle',
  templateUrl: './preloader-circle.component.html',
  styleUrls: ['./preloader-circle.component.scss']
})
export class PreloaderCircleComponent {
  @Input() showCircle!: boolean;
  
  constructor() { }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader-linear',
  templateUrl: './preloader-linear.component.html',
  styleUrls: ['./preloader-linear.component.scss']
})

export class PreloaderLinearComponent {
  @Input() showLinear!: boolean;
  constructor() { }

}

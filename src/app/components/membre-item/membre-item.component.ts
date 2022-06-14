import { Component, Input, OnInit } from '@angular/core';
import { Membre } from '../../models/membre';

@Component({
  selector: 'app-membre-item',
  templateUrl: './membre-item.component.html',
  styleUrls: ['./membre-item.component.scss']
})
export class MembreItemComponent {
  @Input() membre!: Membre;
  constructor() { 
    
  }
}

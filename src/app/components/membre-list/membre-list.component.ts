import { Component, OnInit } from '@angular/core';
import { Membre } from '../../models/membre';

@Component({
  selector: 'app-membre-list',
  templateUrl: './membre-list.component.html',
  styleUrls: ['./membre-list.component.scss']
})
export class MembreListComponent implements OnInit {
  membres!:Membre[];
  constructor() { }

  ngOnInit() {
    this.membres = [
      {
        nom: 'AKAKPO',
        prenom: 'Adje',
        sexe: 'Masculin',
        dateDeNaissance:new Date(),
        adresse:'Lome',
        telephone:'0022892106475',
        photo:''
      },
      {
        nom: 'AKAKPO1',
        prenom: 'Adjele',
        sexe: 'Feminin',
        dateDeNaissance:new Date(),
        adresse:'Lome',
        telephone:'0022898718111',
        photo:''
      },
      {
        nom: 'AKAKPO1',
        prenom: 'Adjele',
        sexe: 'Feminin',
        dateDeNaissance:new Date(),
        adresse:'Lome',
        telephone:'0022898718111',
        photo:''
      },
      {
        nom: 'AKAKPO1',
        prenom: 'Adjele',
        sexe: 'Feminin',
        dateDeNaissance:new Date(),
        adresse:'Lome',
        telephone:'0022898718111',
        photo:''
      },
      {
        nom: 'AKAKPO1',
        prenom: 'Adjele',
        sexe: 'Feminin',
        dateDeNaissance:new Date(),
        adresse:'Lome',
        telephone:'0022898718111',
        photo:''
      },
      {
        nom: 'AKAKPO1',
        prenom: 'Adjele',
        sexe: 'Feminin',
        dateDeNaissance:new Date(),
        adresse:'Lome',
        telephone:'0022898718111',
        photo:''
      }
    ]
  }

}

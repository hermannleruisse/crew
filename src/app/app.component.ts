import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Membre } from './models/membre';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EGCI';
  showLinear : boolean = false;
  showCircle : boolean = false;
  myMember!: Membre;
  membres!:Membre[];

  interval$!: Observable<string>;

  logger(text: string): void{
    console.log(`Log : ${text}`);
  }

  ngOnInit() {
    this.showLinear = false;
    this.showCircle = true;
    // this.membres = [
    //   {
    //     nom: 'AKAKPO',
    //     prenom: 'Adje',
    //     sexe: 'Masculin',
    //     dateDeNaissance:new Date(),
    //     adresse:'Lome',
    //     telephone:'0022892106475',
    //     photo:''
    //   },
    //   {
    //     nom: 'AKAKPO1',
    //     prenom: 'Adjele',
    //     sexe: 'Feminin',
    //     dateDeNaissance:new Date(),
    //     adresse:'Lome',
    //     telephone:'0022898718111',
    //     photo:''
    //   }
    // ]
    // this.myMember = new Membre('toto', 'tata', 'M', new Date(), 'Lome', '228987654', '');

    this.interval$ = interval(1000).pipe(
      filter(value => value % 3 === 0),
      map(value => value % 2 === 0 ? `je suis ${value} et je suis pair` : `je suis ${value} et je suis impair`),
      tap(text => this.logger(text))
    );
    // interval$.subscribe(value => console.log(value));
    
    // setTimeout(() => {
    //   interval$.subscribe(value => console.log(value));
    // }, 3000);
  }
}

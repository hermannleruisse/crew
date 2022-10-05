import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Fonction } from 'src/app/models/fonction';
import { Profile } from 'src/app/models/profile';
// import * as M from 'materialize-css';

@Component({
  selector: 'app-habilitation',
  templateUrl: './habilitation.component.html',
  styleUrls: ['./habilitation.component.scss']
})
export class HabilitationComponent implements OnInit, AfterViewInit {
  instance:any;
  profiles: Profile[];
  fonctions: Fonction[];
  habilitationForm: FormGroup;
  get profileSelectedList(){ return this.habilitationForm.get("selectedProfile");}
  
  constructor(private formBuilder: FormBuilder) { }
  
  ngAfterViewInit(): void {
    // this.instance = M.FormSelect.init(document.querySelector('select'));
    // this.instance = M.AutoInit();
  }

  ngOnInit(): void {
    console.log('habilitation');
    this.habilitationForm = this.formBuilder.group({
      selectedProfile:[null, [Validators.required]]
    },{
      updateOn: 'change'
    });
    

    //async profiles
    of(this.getProfiles()).subscribe(profiles => {
      this.profiles = profiles;
      // this.habilitationForm.controls.selectedProfile.patchValue(this.profiles[0].id);
    });

    console.log(this.profiles);
  }

  

  /**
   * charge les fonctionnalités en fonction du profile selectionné
   */
  changeProfile(){
    console.log(this.profileSelectedList.value);
    
    of(this.getFonctions()).subscribe(fonctions => {
      this.fonctions = fonctions;
    });
  }

  /**
   * change le status des actions d'une fonctionnalite 
   */
  onCheckboxChange(j:number, k:number){
    if(this.fonctions[j].action[k].checked == true){
      this.fonctions[j].action[k].checked = false;
    }else{
      this.fonctions[j].action[k].checked = true;
    }
  }

  /**
   * Mise a jour d'une habilitation
   */
  saveHabilitation(){
    if(this.habilitationForm.valid){
      console.log('selected value '+this.profileSelectedList.value);
      console.log(this.habilitationForm.value);
    }
  }

  /**
   * retourne la liste des profiles
   * @returns 
   */
  getProfiles(){
    return [
      { id: '0001', code: 'ADM', libelle: 'ADMIN', description: 'Administrateur du systeme' },
      { id: '0002', code: 'USR', libelle: 'USER', description: 'Utilisateur du systeme' }
    ]
  }

  /**
   * retourne la liste des fonctions
   * @returns 
   */
  getFonctions(){
    return [
      { id: 1, libelle: 'Fonction 1', 
        action:[
          {id:1, code:'action_1', libelle:'action 1', checked:false},
          {id:2, code:'action_2', libelle:'action 2', checked:true},
          {id:3, code:'action_3', libelle:'action 3', checked:true}
        ]
      },
      { id: 2, libelle: 'Fonction 2', 
        action:[
          {id:1, code:'action_1', libelle:'action 1', checked:true},
          {id:2, code:'action_2', libelle:'action 2', checked:true},
        ]
      }
    ]
  }

}

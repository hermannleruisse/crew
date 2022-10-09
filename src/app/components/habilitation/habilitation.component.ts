import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fonction } from 'src/app/models/fonction';
import { Profile } from 'src/app/models/profile';
import { Url } from 'src/app/models/url';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';

export interface Habilitation{
  profile: string,
  fonctions: Fonction[]
}

@Component({
  selector: 'app-habilitation',
  templateUrl: './habilitation.component.html',
  styleUrls: ['./habilitation.component.scss']
})
export class HabilitationComponent implements OnInit {
  profiles: Profile[];
  fonctions: Fonction[];
  habilitationForm: FormGroup;
  habilitation: Habilitation;

  get profileSelectedList(){ return this.habilitationForm.get("selectedProfile");}
  
  constructor(private formBuilder: FormBuilder, private toolService: ToolService, private apiService: ApiService) { }
  
  ngOnInit(): void {
    console.log('habilitation');
    this.habilitationForm = this.formBuilder.group({
      selectedProfile:[null, [Validators.required]]
    },{
      updateOn: 'change'
    });
    
    this.getProfiles();
    this.getFonctions();
  }

  /**
   * charge les fonctionnalités en fonction du profile selectionné
   */
  changeProfile(){
    console.log(this.profileSelectedList.value);
    this.toolService.showLoading();
    this.apiService.get(Url.PROFILE_LIST_URL+"/"+this.profileSelectedList.value, {}).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        this.fonctions = data;
      }, (error) => {
        console.log('erreur ' + JSON.stringify(error));
        this.toolService.hideLoading();
      }, () => {
        this.toolService.hideLoading();
        console.log('complete');
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
      this.toolService.showLoading();
      this.habilitation.profile = this.profileSelectedList.value;
      this.habilitation.fonctions = this.fonctions;
      
      this.apiService.post(Url.PROFILE_ADD_URL, this.habilitation, {}).subscribe(
        (data) => {
          this.toolService.showToast('Mise a jour de reussie', 'OK', 3000);
        }, (error) => {
          console.log('erreur ' + JSON.stringify(error));
          this.toolService.hideLoading();
          this.toolService.showToast(error.message, 'OK');
        }, () => {
          this.toolService.hideLoading();
          
        });
    }
  }

  /**
   * retourne la liste des profiles
   * @returns 
   */
   getProfiles() {
    this.apiService.get(Url.PROFILE_LIST_URL, {})
      .subscribe((data) => {
        this.profiles = data;
      });
  }

  /**
   * retourne la liste des fonctions
   * @returns 
   */
  getFonctions(){
    this.toolService.showLoading();
    this.apiService.get(Url.PROFILE_LIST_URL, {}).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        this.fonctions = data;
      }, (error) => {
        console.log('erreur ' + JSON.stringify(error));
        this.toolService.hideLoading();
      }, () => {
        this.toolService.hideLoading();
        console.log('complete');
      });
  }

}

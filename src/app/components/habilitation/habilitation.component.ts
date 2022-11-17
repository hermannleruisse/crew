import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Action } from 'src/app/models/action';
import { Fonction } from 'src/app/models/fonction';
import { Habilitation } from 'src/app/models/habilitation';
import { Profile } from 'src/app/models/profile';
import { Url } from 'src/app/url';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';

export interface CheckHabilitation{
  profile: string,
  permission: string
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
  habilitation: Habilitation = {
    profile: '',
    permissions: []
  };
  checkhabilitation: CheckHabilitation;

  get selectedProfile(){ return this.habilitationForm.get("selectedProfile");}

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
    console.log(this.selectedProfile.value);
    

    if(this.habilitationForm.valid){
      this.fonctions = [];
      this.toolService.showLoading();
      
      this.apiService.get(Url.HABILIT_LIST_URL+"/"+this.selectedProfile.value, {}).subscribe(
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

  /**
   * change le status des actions d'une fonctionnalite
   */
  onCheckboxChange(j:number, k:number){
    if(this.fonctions[j].permissions[k].checked == true){
      this.fonctions[j].permissions[k].checked = false;
    }else{
      this.fonctions[j].permissions[k].checked = true;
    }
    console.log('element value '+JSON.stringify(this.fonctions));
  }

  /**
   * Mise a jour d'une habilitation
   */
  saveHabilitation(){
    if(this.habilitationForm.valid){
      console.log('selected value '+this.selectedProfile.value);

      this.toolService.showLoading();
      this.habilitation.profile = this.selectedProfile.value;
      this.habilitation.permissions = [];

      this.fonctions.forEach(element => {
        element.permissions.forEach(list =>{
          this.habilitation.permissions.push(list);
        })
      });

      this.apiService.post(Url.HABILIT_ADD_URL, this.habilitation, {}).subscribe(
        (data) => {
          this.toolService.showToast('Mise à jour de réussie', 'OK', 3000);
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
    this.apiService.get(Url.HABILIT_LIST_URL, {}).subscribe(
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
   * vérifie si le profil est habilité
   * @returns
   */
   checkAuthority():boolean{
    this.apiService.post(Url.HABILIT_CHECK_URL, this.checkhabilitation, {}).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        return data;
      }, (error) => {
        console.log('erreur ' + JSON.stringify(error));
      });
      return false;
  }

}

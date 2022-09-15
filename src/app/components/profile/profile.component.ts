import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/models/profile';
import { ToolService } from 'src/app/services/tool.service';
import Swal from 'sweetalert2';
import * as M from 'materialize-css';
import { ApiService } from 'src/app/services/api.service';
import { Url } from 'src/app/models/url';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  editModeProfileForm: FormGroup;
  editFormTitle?:string;
  @ViewChild('closeBtnEdit') closeBtnEdit: ElementRef;
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // // headers.append('Authorization', 'Bearer ' + '');
    // headers.append('Access-Control-Allow-Origin', '*');

  profile: Profile = {
    id: '',
    code: '',
    libelle: '',
    description: ''
  };
 
  profilePreview$!: Observable<Profile>;
  editMode: boolean = false;
  get code(){ return this.profileForm.get("code");}
  get libelle(){ return this.profileForm.get("libelle");}
  get description(){ return this.profileForm.get("description");}

  get idEdit(){ return this.editModeProfileForm.get("id");}
  get codeEdit(){ return this.editModeProfileForm.get("code");}
  get libelleEdit(){ return this.editModeProfileForm.get("libelle");}
  get descriptionEdit(){ return this.editModeProfileForm.get("description");}

  profiles = [];

  constructor(private formBuilder: FormBuilder, private toolService:ToolService, private apiService:ApiService) {
  }

  /**
   * Initialisation du formulaire d'ajout de profile avec les validations
   */
  createProfilForm(){
    this.profileForm = this.formBuilder.group({
      code: [null, [Validators.required]],
      libelle: [null, [Validators.required]],
      description: [null]
    },{
      updateOn: 'blur'
    });
  }

  /**
   * Initialisation du formulaire d'edition de profile avec les validations
   */
  editProfilForm(){
    this.editModeProfileForm = this.formBuilder.group({
      id: [{ value: '', disabled:true}],
      code: [{ value: '', disabled:true}, [Validators.required]],
      libelle: [{ value: '', disabled:true}, [Validators.required]],
      description: [{ value: '', disabled:true}]
    },{
      updateOn: 'change'
    });
  }

  ngOnInit(): void {
    M.AutoInit();
    console.log("profile");
    this.createProfilForm();
    this.editProfilForm();

    this.getProfilesList();
    // this.profiles = [
    //   {
    //     id: '0001',
    //     code: 'ADM',
    //     libelle: 'ADMIN',
    //     description: 'Administrateur du systeme'
    //   },
    //   {
    //     id: '0002',
    //     code: 'USR',
    //     libelle: 'USER',
    //     description: 'Utilisateur du systeme'
    //   }
    // ]

    this.profilePreview$ = this.profileForm.valueChanges.pipe(
      map(formValue => ({
        formValue,
        code:formValue.code,
        libelle:'',
        description:''
      }))
    )
  }

  getProfilesList(){
    this.toolService.showLoading();
    this.apiService.get(Url.PROFILE_LIST_URL, null).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        this.profiles = data;
      }, (error) => {
        console.log('erreur ' + JSON.stringify(error));
        this.toolService.hideLoading();
        this.toolService.showToast(ToolService.TOAST_ERROR, error.message, 'Profile');
      }, () => {
        this.toolService.hideLoading();
        console.log('complete');
      });
  }

  /**
   * click sur le bouton Ajouter du modal pour enregister un profile
   */
  onSubmitForm(){
    if(this.profileForm.valid){
      this.profile.code = this.code.value;
      this.profile.libelle = this.libelle.value;
      this.profile.description = this.description.value;
      
      console.log(this.profileForm.value);
      this.apiService.post(Url.PROFILE_ADD_URL, this.profile, null).subscribe(
        (data) => {
          console.log('data => ' + JSON.stringify(data));
          this.toolService.showToast(ToolService.TOAST_SUCCESS, 'Nouveau profile enregistrer', 'Profile');
        }, (error) => {
          console.log('erreur ' + JSON.stringify(error));
          this.toolService.hideLoading();
          this.toolService.showToast(ToolService.TOAST_ERROR, error.message, 'Profile');
        }, () => {
          this.toolService.hideLoading();
          console.log('complete');
        });
    }
  }

  /**
   * click sur le bouton Valider du modal pour edition
   */
  onUpdateForm(){
    // console.log(this.code.errors.required);
    if(this.editModeProfileForm.valid){
      console.log(this.editModeProfileForm.value);
    }
  }

  /**
   * click sur le bouton Fermer du modal
   */
  onModalClose(){
    this.editMode = false;
    this.editModeProfileForm.disable();
    this.editModeProfileForm.reset();
  }

  /**
   * 
   * @param profile 
   * reccuperer le profil actuel en cliquant sur une ligne du tableau 
   */
  getCurrentProfile(profile: Profile){
    this.editFormTitle = "Detail";
    this.editModeProfileForm.get("id").setValue(profile.id);
    this.editModeProfileForm.get("code").setValue(profile.code);
    this.editModeProfileForm.get("libelle").setValue(profile.libelle);
    this.editModeProfileForm.get("description").setValue(profile.description);
    
    if(profile != null){
      console.log(profile);
      this.profile = profile;
    }
  }

  /**
   * click sur le bouton Editer pour passer en mode edition
   */
  enableEditMode(){
    this.editMode = true;
    this.editFormTitle = "Edition";
    // this.editModeProfileForm.get("code").enable();
    this.editModeProfileForm.enable();
  }

  /**
   * Fermerture du modal automatique
   */
  closeModalEdit(): void {
    this.closeBtnEdit.nativeElement.click();
  }

  /**
   * click sur le bouton Supprimer pour supprimmer un profile
   */
  deleteProfile(){
    console.log("idProfile => "+this.idEdit.value)
    this.toolService.showConfirmation("Suppression", "Voulez-vous supprimer ce profile ?", "question", "Oui",
      "Non", false).then((result) =>{
        if(result.isConfirmed){
          this.toolService.removeElementFromObjectArray(this.profiles, this.idEdit.value);
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            '',
            'Suppression anuler :)',
            'error'
          )
        }
      }).finally(()=>{
        //fermerture du modal
        this.closeModalEdit();
      })
  }

}

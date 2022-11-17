import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Profile } from 'src/app/models/profile';
import { Url } from 'src/app/url';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-dialog-profile-add',
  templateUrl: './dialog-profile-add.component.html',
  styleUrls: ['./dialog-profile-add.component.scss']
})
export class DialogProfileAddComponent implements OnInit {
  profileForm: FormGroup;

  profile: Profile = {
    id: '',
    code: '',
    libelle: '',
    description: ''
  };

  get code(){ return this.profileForm.get("code");}
  get libelle(){ return this.profileForm.get("libelle");}
  get description(){ return this.profileForm.get("description");}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  constructor(private formBuilder: FormBuilder, private toolService:ToolService,
  private apiService:ApiService, private dialogRef: MatDialogRef<DialogProfileAddComponent>) { }

  ngOnInit(): void {
    this.createProfilForm();
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
   * click sur le bouton Ajouter du modal pour enregister un profile
   */
   onSubmitForm(){
    console.log(this.profileForm.invalid);
    if(this.profileForm.valid){
      this.toolService.showLoading();
      this.profile.code = this.code.value;
      this.profile.libelle = this.libelle.value;
      this.profile.description = this.description.value;
      
      // console.log(this.profileForm.value);
      this.apiService.post(Url.PROFILE_ADD_URL, this.profile, {}).subscribe(
        (data) => {
          this.dialogRef.close();
          this.toolService.showToast('Nouveau profile enregistrer', 'OK', 3000);
        }, (error) => {
          console.log('erreur ' + JSON.stringify(error));
          this.toolService.hideLoading();
          this.toolService.showToast(error.message, 'OK');
        }, () => {
          this.toolService.hideLoading();
          // this.getProfilesList();
        });
    }
  }

}

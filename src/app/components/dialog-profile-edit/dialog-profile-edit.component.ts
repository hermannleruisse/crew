import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/profile';
import { Url } from 'src/app/url';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
  selectedProfile: Profile;
}

@Component({
  selector: 'app-dialog-profile-edit',
  templateUrl: './dialog-profile-edit.component.html',
  styleUrls: ['./dialog-profile-edit.component.scss']
})
export class DialogProfileEditComponent implements OnInit {
  editModeProfileForm: FormGroup;

  profile: Profile = {
    id: '',
    code: '',
    libelle: '',
    description: ''
  };

  get idEdit() { return this.editModeProfileForm.get("id"); }
  get codeEdit() { return this.editModeProfileForm.get("code"); }
  get libelleEdit() { return this.editModeProfileForm.get("libelle"); }
  get descriptionEdit() { return this.editModeProfileForm.get("description"); }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private toolService: ToolService, private apiService: ApiService, private dialogRef: MatDialogRef<DialogProfileEditComponent>) { }

  ngOnInit(): void {
    this.editProfilForm();
    this.getCurrentProfile(this.data.selectedProfile);
  }

  /**
   * Initialisation du formulaire d'edition de profile avec les validations
   */
  editProfilForm() {
    this.editModeProfileForm = this.formBuilder.group({
      id: [{ value: '', disabled: false }],
      code: [{ value: '', disabled: false }, [Validators.required]],
      libelle: [{ value: '', disabled: false }, [Validators.required]],
      description: [{ value: '', disabled: false }]
    }, {
      updateOn: 'change'
    });
  }

  /**
   * 
   * @param profile 
   * reccuperer le profil actuel en cliquant sur une ligne du tableau 
   */
  getCurrentProfile(profile: Profile) {
    this.editModeProfileForm.get("id").setValue(profile.id);
    this.editModeProfileForm.get("code").setValue(profile.code);
    this.editModeProfileForm.get("libelle").setValue(profile.libelle);
    this.editModeProfileForm.get("description").setValue(profile.description);

    if (profile != null) {
      console.log(profile);
      this.profile = profile;
    }
  }

  /**
   * click sur le bouton Valider du modal pour edition
   */
  onUpdateForm() {
    // console.log(this.code.errors.required);
    if (this.editModeProfileForm.valid) {
      this.toolService.showLoading();
      this.profile.code = this.codeEdit.value;
      this.profile.libelle = this.libelleEdit.value;
      this.profile.description = this.descriptionEdit.value;

      this.apiService.put(Url.PROFILE_EDIT_URL + "/" + this.idEdit.value, this.profile, {}).subscribe(
        (data) => {
          this.dialogRef.close();
          this.toolService.showToast('Edition de profile réussie', 'OK', 3000);
        }, (error) => {
          this.toolService.hideLoading();
          this.toolService.showToast(error.error.message, 'OK');
        }, () => {
          this.toolService.hideLoading();
          console.log('complete');
        });
    }
  }

}

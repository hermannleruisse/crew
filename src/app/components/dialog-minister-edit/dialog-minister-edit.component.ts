import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ministere } from 'src/app/models/ministere';
import { Url } from 'src/app/url';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';

export interface DialogData {
  selectedMinister: Ministere;
}

@Component({
  selector: 'app-dialog-minister-edit',
  templateUrl: './dialog-minister-edit.component.html',
  styleUrls: ['./dialog-minister-edit.component.scss']
})
export class DialogMinisterEditComponent implements OnInit {
  editModeMinisterForm: FormGroup;

  minister: Ministere = {
    id: '',
    code: '',
    libelle: '',
    description: ''
  };

  get idEdit() { return this.editModeMinisterForm.get("id"); }
  get codeEdit() { return this.editModeMinisterForm.get("code"); }
  get libelleEdit() { return this.editModeMinisterForm.get("libelle"); }
  get descriptionEdit() { return this.editModeMinisterForm.get("description"); }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private toolService: ToolService, private apiService: ApiService, private dialogRef: MatDialogRef<DialogMinisterEditComponent>) { }

  ngOnInit(): void {
    this.editMinisterForm();
    this.getCurrentProfile(this.data.selectedMinister);
  }

  /**
   * Initialisation du formulaire d'edition avec les validations
   */
  editMinisterForm() {
    this.editModeMinisterForm = this.formBuilder.group({
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
   * @param minister 
   * reccuperer le profil actuel en cliquant sur une ligne du tableau 
   */
  getCurrentProfile(minister: Ministere) {
    this.editModeMinisterForm.get("id").setValue(minister.id);
    this.editModeMinisterForm.get("code").setValue(minister.code);
    this.editModeMinisterForm.get("libelle").setValue(minister.libelle);
    this.editModeMinisterForm.get("description").setValue(minister.description);

  }

  /**
   * click sur le bouton Valider du modal pour edition
   */
  onUpdateForm() {
    // console.log(this.code.errors.required);
    if (this.editModeMinisterForm.valid) {
      this.toolService.showLoading();
      this.minister.code = this.codeEdit.value;
      this.minister.libelle = this.libelleEdit.value;
      this.minister.description = this.descriptionEdit.value;

      this.apiService.put(Url.MINIS_EDIT_URL + "/" + this.idEdit.value, this.minister, {}).subscribe(
        (data) => {
          this.dialogRef.close();
          this.toolService.showToast('Edition réussie', 'OK', 3000);
        }, (error) => {
          // console.log('erreur ' + JSON.stringify(error));
          this.toolService.hideLoading();
          this.toolService.showToast(error.message, 'OK');
        }, () => {
          this.toolService.hideLoading();
          console.log('complete');
        });
    }
  }

}

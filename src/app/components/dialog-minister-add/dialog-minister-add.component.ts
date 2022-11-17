import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Ministere } from 'src/app/models/ministere';
import { Url } from 'src/app/url';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-dialog-minister-add',
  templateUrl: './dialog-minister-add.component.html',
  styleUrls: ['./dialog-minister-add.component.scss']
})
export class DialogMinisterAddComponent implements OnInit {

  ministerForm: FormGroup;

  minister: Ministere = {
    id: '',
    code: '',
    libelle: '',
    description: ''
  };

  get code(){ return this.ministerForm.get("code");}
  get libelle(){ return this.ministerForm.get("libelle");}
  get description(){ return this.ministerForm.get("description");}
  
  constructor(private formBuilder: FormBuilder, private toolService:ToolService,
  private apiService:ApiService, private dialogRef: MatDialogRef<DialogMinisterAddComponent>) { }

  ngOnInit(): void {
    this.createMinisterForm();
  }

  /**
   * Initialisation du formulaire d'ajout avec les validations
   */
   createMinisterForm(){
    this.ministerForm = this.formBuilder.group({
      code: [null, [Validators.required]],
      libelle: [null, [Validators.required]],
      description: [null]
    },{
      updateOn: 'blur'
    });
  }

  /**
   * click sur le bouton Ajouter du modal pour enregister
   */
   onSubmitForm(){
    if(this.ministerForm.valid){
      this.toolService.showLoading();
      this.minister.code = this.code.value;
      this.minister.libelle = this.libelle.value;
      this.minister.description = this.description.value;
      
      this.apiService.post(Url.MINIS_ADD_URL, this.minister, {}).subscribe(
        (data) => {
          this.dialogRef.close();
          this.toolService.showToast('Nouveau element enregistrer', 'OK', 3000);
        }, (error) => {
          console.log('erreur ' + JSON.stringify(error));
          this.toolService.hideLoading();
          this.toolService.showToast(error.message, 'OK');
        }, () => {
          this.toolService.hideLoading();
          
        });
    }
  }

}

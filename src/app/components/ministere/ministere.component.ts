import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ministere } from 'src/app/models/ministere';
import { ToolService } from 'src/app/services/tool.service';
import * as M from 'materialize-css';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
  selector: 'app-ministere',
  templateUrl: './ministere.component.html',
  styleUrls: ['./ministere.component.scss']
})
export class MinistereComponent implements OnInit {
  ministerForm: FormGroup;
  editModeMinisterForm: FormGroup;
  editFormTitle?:string;
  @ViewChild('closeBtnEdit') closeBtnEdit: ElementRef;

  minister: Ministere = {
    id: '',
    code: '',
    libelle: '',
    description: ''
  };
  editMode: boolean = false;
  get code(){ return this.ministerForm.get("code");}
  get libelle(){ return this.ministerForm.get("libelle");}

  get idEdit(){ return this.editModeMinisterForm.get("id");}
  get codeEdit(){ return this.editModeMinisterForm.get("code");}
  get libelleEdit(){ return this.editModeMinisterForm.get("libelle");}

  ministeres = [];

  constructor(private formBuilder: FormBuilder, private toolService:ToolService) {
  }

  /**
   * Initialisation du formulaire d'ajout de profile avec les validations
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
   * Initialisation du formulaire d'edition de profile avec les validations
   */
  editMinisterForm(){
    this.editModeMinisterForm = this.formBuilder.group({
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
    this.createMinisterForm();
    this.editMinisterForm();

    //async ministere
    of(this.getMinisteres()).subscribe(ministeres => {
      this.ministeres = ministeres;
    });
  }

  /**
   * retourne la liste des ministeres
   * @returns 
   */
   getMinisteres(){
    return [
      { id: '0001', code: 'MJEU', libelle: 'JEUNE', description: 'Ministere des jeunes' },
      { id: '0002', code: 'MHOM', libelle: 'HOMME', description: 'Ministere des hommes' }
    ]
  }

  /**
   * click sur le bouton Ajouter du modal pour enregister un ministere
   */
  onSubmitForm(){
    if(this.ministerForm.valid){
      console.log(this.ministerForm.value);
    }
  }

  /**
   * click sur le bouton Valider du modal pour edition
   */
  onUpdateForm(){
    // console.log(this.code.errors.required);
    if(this.editModeMinisterForm.valid){
      console.log(this.editModeMinisterForm.value);
    }
  }

  /**
   * click sur le bouton Fermer du modal
   */
  onModalClose(){
    this.editMode = false;
    this.editModeMinisterForm.disable();
    this.editModeMinisterForm.reset();
  }

  /**
   * 
   * @param minister 
   * reccuperer le ministere actuel en cliquant sur une ligne du tableau 
   */
  getCurrentMinister(minister: Ministere){
    this.editFormTitle = "Detail";
    this.editModeMinisterForm.get("id").setValue(minister.id);
    this.editModeMinisterForm.get("code").setValue(minister.code);
    this.editModeMinisterForm.get("libelle").setValue(minister.libelle);
    this.editModeMinisterForm.get("description").setValue(minister.description);
    
    if(minister != null){
      console.log(minister);
      this.minister = minister;
    }
  }

  /**
   * click sur le bouton Editer pour passer en mode edition
   */
  enableEditMode(){
    this.editMode = true;
    this.editFormTitle = "Edition";
    // this.editModeProfileForm.get("code").enable();
    this.editModeMinisterForm.enable();
  }

  /**
   * Fermerture du modal automatique
   */
  closeModalEdit(): void {
    this.closeBtnEdit.nativeElement.click();
  }

  /**
   * click sur le bouton Supprimer pour supprimmer un ministere
   */
  deleteMinister(){
    console.log("idMinister => "+this.idEdit.value)
    this.toolService.showConfirmation("Suppression", "Voulez-vous supprimer ce ministere ?", "question", "Oui",
      "Non", false).then((result) =>{
        if(result.isConfirmed){
          this.toolService.removeElementFromObjectArray(this.ministeres, this.idEdit.value);
          
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

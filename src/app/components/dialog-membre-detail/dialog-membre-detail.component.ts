import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Membre } from 'src/app/models/membre';
import { Ministere } from 'src/app/models/ministere';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';
import { Url } from 'src/app/url';

export interface DialogData {
  selectedMember: Membre;
}

@Component({
  selector: 'app-dialog-membre-detail',
  templateUrl: './dialog-membre-detail.component.html',
  styleUrls: ['./dialog-membre-detail.component.scss']
})
export class DialogMembreDetailComponent implements OnInit {
  url = "./assets/img/avatar1.png";
  selectedFile:File = null;
  detailModeMemberForm: FormGroup;
  ministeres: Ministere[];
  member: Membre;

  get idEdit(){ return this.detailModeMemberForm.get("id");}
  get nomEdit(){ return this.detailModeMemberForm.get("nom");}
  get prenomEdit(){ return this.detailModeMemberForm.get("prenom");}
  get dateNaissanceEdit(){ return this.detailModeMemberForm.get("dateNaissance");}
  get adresseEdit(){ return this.detailModeMemberForm.get("adresse");}
  get telephoneEdit(){ return this.detailModeMemberForm.get("telephone");}
  get photoEdit(){ return this.detailModeMemberForm.get("photo");}
  get selectedMinisterEdit(){ return this.detailModeMemberForm.get("selectedMinister");}
  get selectedSexeEdit(){ return this.detailModeMemberForm.get("selectedSexe");}

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private toolService:ToolService, private apiService:ApiService, private dialogRef: MatDialogRef<DialogMembreDetailComponent>, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.detailMemberForm();
    //async ministere
    this.getMinisteres();
    this.getCurrentMembre(this.data.selectedMember);
  }

  /**
   * retourne la liste des ministeres
   * @returns 
   */
   getMinisteres(){
    this.apiService.get(Url.MINIS_LIST_URL, {})
      .subscribe((data) => {
        this.ministeres = data;
      });
  }

  /**
   * Initialisation du formulaire de detail d'un membre avec les validations
   */
   detailMemberForm(){
    this.detailModeMemberForm = this.formBuilder.group({
      id: [{ value: '', disabled:true}],
      nom: [{ value: '', disabled:true}],
      prenom: [{ value: '', disabled:true}],
      dateNaissance: [{ value: '', disabled:true}],
      selectedSexe: [{ value: '', disabled:true}],
      adresse: [{ value: '', disabled:true}],
      telephone: [{ value: '', disabled:true}],
      selectedMinister:[{ value: '', disabled:true}],
      photo:[{ value: '', disabled:true}]
    });
  }

  /**
   * 
   * @param membre 
   * reccuperer le membre actuel en cliquant sur une ligne du tableau 
   */
   getCurrentMembre(membre: any){
    this.detailModeMemberForm.get("id").setValue(membre.id);
    this.detailModeMemberForm.get("nom").setValue(membre.nom);
    this.detailModeMemberForm.get("prenom").setValue(membre.prenom);
    const [day, month, year] = membre.dateDeNaissance.split('/');
    this.detailModeMemberForm.get("dateNaissance").setValue(new Date(+year, month - 1, +day));
    this.detailModeMemberForm.get("selectedSexe").setValue(membre.sexe);
    this.detailModeMemberForm.get("adresse").setValue(membre.adresse);
    this.detailModeMemberForm.get("telephone").setValue(membre.telephone);
    this.detailModeMemberForm.get("selectedMinister").setValue(membre.ministere.id);
    this.url = `${Url.FILE_URL}/${membre.photo}`;
  }

}

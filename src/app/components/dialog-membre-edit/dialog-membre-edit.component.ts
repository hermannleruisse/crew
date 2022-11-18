import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Membre } from 'src/app/models/membre';
import { Ministere } from 'src/app/models/ministere';
import { Url } from 'src/app/url';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';

export interface DialogData {
  selectedMember: Membre;
}

@Component({
  selector: 'app-dialog-membre-edit',
  templateUrl: './dialog-membre-edit.component.html',
  styleUrls: ['./dialog-membre-edit.component.scss']
})
export class DialogMembreEditComponent implements OnInit {
  url = "./assets/img/avatar1.png";
  selectedFile:File = null;
  editModeMemberForm: FormGroup;
  ministeres: Ministere[];
  member: Membre;

  get idEdit(){ return this.editModeMemberForm.get("id");}
  get nomEdit(){ return this.editModeMemberForm.get("nom");}
  get prenomEdit(){ return this.editModeMemberForm.get("prenom");}
  get dateNaissanceEdit(){ return this.editModeMemberForm.get("dateNaissance");}
  get adresseEdit(){ return this.editModeMemberForm.get("adresse");}
  get telephoneEdit(){ return this.editModeMemberForm.get("telephone");}
  get photoEdit(){ return this.editModeMemberForm.get("photo");}
  get selectedMinisterEdit(){ return this.editModeMemberForm.get("selectedMinister");}
  get selectedSexeEdit(){ return this.editModeMemberForm.get("selectedSexe");}

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private toolService:ToolService, private apiService:ApiService, private dialogRef: MatDialogRef<DialogMembreEditComponent>, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.editMemberForm();
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
   * Initialisation du formulaire d'edition d'un membre avec les validations
   */
   editMemberForm(){
    this.editModeMemberForm = this.formBuilder.group({
      id: [{ value: '', disabled:false}],
      nom: [{ value: '', disabled:false}, [Validators.required]],
      prenom: [{ value: '', disabled:false}, [Validators.required]],
      dateNaissance: [{ value: '', disabled:false}, [Validators.required]],
      selectedSexe: [{ value: '', disabled:false}, [Validators.required]],
      adresse: [{ value: '', disabled:false}, [Validators.required]],
      telephone: [{ value: '', disabled:false}, [Validators.required]],
      selectedMinister:[{ value: '', disabled:false}, [Validators.required]],
      photo:[{ value: '', disabled:false}, [Validators.required]]
    },{
      updateOn: 'change'
    });
  }

  onSelectFile(e){
    // https://refine.dev/blog/how-to-base64-upload/
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.selectedFile = <File> e.target.files[0];
      reader.onload = (event:any)=>{
        this.url = event.target.result;
      }
    }
  }

  onUpload(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.apiService.post('sds', fd, { headers: headers, responseType: 'json' })
    .subscribe(res => {
      console.log(res);
    });
  }

  /**
   * click sur le bouton Valider du modal pour edition
   */
   onUpdateForm(){
    // console.log(this.code.errors.required);
    if (this.editModeMemberForm.valid) {
      console.log(this.editModeMemberForm.value);
      this.toolService.showLoading();
      this.member.nom = this.nomEdit.value;
      this.member.prenom = this.prenomEdit.value;
      this.member.adresse = this.adresseEdit.value;
      this.member.dateDeNaissance = this.datePipe.transform(this.dateNaissanceEdit.value, 'dd/MM/yyyy');
      // this.member.dateDeNaissance = this.datePipe.transform(this.dateNaissanceEdit.value, 'YYYY-MM-DDTHH:mm:ss.sssZ');
      this.member.sexe = this.selectedSexeEdit.value;
      this.member.ministere = this.selectedMinisterEdit.value;
      this.member.telephone = this.telephoneEdit.value;
      this.member.photo = this.url;

      // console.log(this.profileForm.value);
      this.apiService.put(Url.MEMBR_EDIT_URL + "/" + this.idEdit.value, this.member, {}).subscribe(
        (data) => {
          this.dialogRef.close();
          this.toolService.showToast('Mise à jour reussie', 'OK', 3000);
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

  /**
   * 
   * @param membre 
   * reccuperer le membre actuel en cliquant sur une ligne du tableau 
   */
   getCurrentMembre(membre: any){
    console.log(JSON.stringify(membre));
    this.editModeMemberForm.get("id").setValue(membre.id);
    this.editModeMemberForm.get("nom").setValue(membre.nom);
    this.editModeMemberForm.get("prenom").setValue(membre.prenom);
    this.editModeMemberForm.get("dateNaissance").setValue(new Date(membre.dateDeNaissance));
    this.editModeMemberForm.get("selectedSexe").setValue(membre.sexe);
    this.editModeMemberForm.get("adresse").setValue(membre.adresse);
    this.editModeMemberForm.get("telephone").setValue(membre.telephone);
    this.editModeMemberForm.get("selectedMinister").setValue(membre.ministere.id);
    this.url = `${Url.FILE_URL}/${membre.photo}`;
    // this.editModeMemberForm.get("photo").setValue(this.url);
    
    if(membre != null){
      console.log(membre);
    }
  }

}

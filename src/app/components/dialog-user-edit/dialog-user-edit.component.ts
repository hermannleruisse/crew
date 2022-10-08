import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from 'src/app/models/profile';
import { Url } from 'src/app/models/url';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';

export interface DialogData {
  selectedUser: User;
}

@Component({
  selector: 'app-dialog-user-edit',
  templateUrl: './dialog-user-edit.component.html',
  styleUrls: ['./dialog-user-edit.component.scss']
})
export class DialogUserEditComponent implements OnInit {
  editModeUserForm: FormGroup;
  url = "./assets/img/avatar.png";
  selectedFile:File = null;
  user: User;
  profiles: Profile[];

  get idEdit(){ return this.editModeUserForm.get("id");}
  get nomEdit(){ return this.editModeUserForm.get("nom");}
  get prenomEdit(){ return this.editModeUserForm.get("prenom");}
  get usernameEdit(){ return this.editModeUserForm.get("username");}
  get passwordEdit(){ return this.editModeUserForm.get("password");}
  get confpassEdit(){ return this.editModeUserForm.get("confpass");}
  get selectedProfileEdit(){ return this.editModeUserForm.get("selectedProfile");}
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private toolService:ToolService, private apiService:ApiService) { }

  ngOnInit(): void {
    this.editUserForm();
    this.getProfiles();
    this.getCurrentUser(this.data.selectedUser);
  }

  onSelectFile(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{
        this.url = event.target.result;
        this.selectedFile = <File> event.target.files[0];
        console.log("file "+JSON.stringify(this.selectedFile.name.split('.').pop()));
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
   * 
   * @param user 
   * reccuperer l'utilisateur actuel en cliquant sur une ligne du tableau 
   */
   getCurrentUser(user: User){
    this.editModeUserForm.get("id").setValue(user.id);
    this.editModeUserForm.get("nom").setValue(user.nom);
    this.editModeUserForm.get("prenom").setValue(user.prenom);
    this.editModeUserForm.get("username").setValue(user.username);
    this.editModeUserForm.get("password").setValue(user.password);
    this.editModeUserForm.get("confpass").setValue(user.password);
    this.editModeUserForm.get("selectedProfile").setValue(user.profile.id);
    // this.editModeUserForm.controls.selectedProfile.patchValue(user.profile);
  }

  /**
   * charge le profile selectionné
   */
   changeProfile(){
    console.log(this.selectedProfileEdit.value);
  }

  /**
   * Initialisation du formulaire d'edition d'un utilisateur avec les validations
   */
   editUserForm(){
    this.editModeUserForm = this.formBuilder.group({
      id: [{ value: '', disabled:true}],
      nom: [{ value: '', disabled:true}, [Validators.required]],
      prenom: [{ value: '', disabled:true}, [Validators.required]],
      username: [{ value: '', disabled:true}, [Validators.required]],
      password: [{ value: '', disabled:true}, [Validators.required, Validators.minLength(6)]],
      confpass: [{ value: '', disabled:true}, [Validators.required]],
      selectedProfile:[{ value: '', disabled:true}, [Validators.required]]
    },{
      updateOn: 'change'
    });
  }

  /**
   * click sur le bouton Valider du modal pour edition
   */
   onUpdateForm(){
    // console.log(this.code.errors.required);
    if (this.editModeUserForm.valid) {
      console.log(this.editModeUserForm.value);
      this.toolService.showLoading();
      this.user.nom = this.nomEdit.value;
      this.user.prenom = this.prenomEdit.value;
      this.user.password = this.passwordEdit.value;
      this.user.profile.id = this.selectedProfileEdit.value;

      // console.log(this.profileForm.value);
      this.apiService.put(Url.PROFILE_EDIT_URL + "/" + this.idEdit.value, this.user, {}).subscribe(
        (data) => {
          // this.closeModalEdit();
          this.toolService.showToast('Edition de profile reussie', 'OK', 3000);
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

import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ToolService } from 'src/app/services/tool.service';
import Swal from 'sweetalert2';
import * as M from 'materialize-css';
import { ApiService } from 'src/app/services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild('closeBtnEdit') closeBtnEdit: ElementRef;
  instance:any;
  instance1:any;
  users = [];
  userForm: FormGroup;
  editModeUserForm: FormGroup;
  editMode: boolean = false;
  editFormTitle?:string;
  profiles: Profile[];
  url = "./assets/img/avatar.png";
  selectedFile:File = null;
  
  get nom(){ return this.userForm.get("nom");}
  get prenom(){ return this.userForm.get("prenom");}
  get username(){ return this.userForm.get("username");}
  get password(){ return this.userForm.get("password");}
  get confpass(){ return this.userForm.get("confpass");}
  get selectedProfile(){ return this.userForm.get("selectedProfile");}

  get idEdit(){ return this.editModeUserForm.get("id");}
  get nomEdit(){ return this.editModeUserForm.get("nom");}
  get prenomEdit(){ return this.editModeUserForm.get("prenom");}
  get usernameEdit(){ return this.editModeUserForm.get("username");}
  get passwordEdit(){ return this.editModeUserForm.get("password");}
  get confpassEdit(){ return this.editModeUserForm.get("confpass");}
  get selectedProfileEdit(){ return this.editModeUserForm.get("selectedProfile");}
  

  constructor(private formBuilder: FormBuilder, private toolService:ToolService, private apiService:ApiService) { }

  ngAfterViewInit(): void {
    this.instance = M.AutoInit();
    this.instance1 = M.Modal.init(document.querySelectorAll('.modal'), {
      dismissible : false
    });
    this.instance = M.FormSelect.init(document.querySelector('select'));
  }

  ngOnInit(): void {
    this.createUserForm();
    this.editUserForm();

    of(this.getUsers()).subscribe(users => {
      this.users = users;
    });

    //async profiles
    of(this.getProfiles()).subscribe(profiles => {
      this.profiles = profiles;
    });

    
    // this.editModeUserForm.controls.selectedProfile.patchValue('0001');
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
   * 
   * @param user 
   * reccuperer l'utilisateur actuel en cliquant sur une ligne du tableau 
   */
   getCurrentUser(user: User){
    this.editFormTitle = "Detail";
    this.editModeUserForm.get("id").setValue(user.id);
    this.editModeUserForm.get("nom").setValue(user.nom);
    this.editModeUserForm.get("prenom").setValue(user.prenom);
    this.editModeUserForm.get("username").setValue(user.username);
    this.editModeUserForm.get("password").setValue(user.password);
    this.editModeUserForm.get("confpass").setValue(user.password);
    this.editModeUserForm.get("selectedProfile").setValue(user.profile.id);
    // this.editModeUserForm.controls.selectedProfile.patchValue(user.profile);
    
    // if(user != null){
    //   console.log(user);
    //   this.user = user;
    // }
  }

  /**
   * charge les fonctionnalités en fonction du profile selectionné
   */
   changeProfile(){
    console.log(this.selectedProfile.value);
  }

  /**
   * click sur le bouton Editer pour passer en mode edition
   */
   enableEditMode(){
    this.editMode = true;
    this.editFormTitle = "Edition";
    this.editModeUserForm.enable();
  }

  /**
   * Initialisation du formulaire d'ajout d'un utilisateur avec les validations
   */
   createUserForm(){
    this.userForm = this.formBuilder.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confpass: [null, [Validators.required]],
      selectedProfile:[null, [Validators.required]]
    },{
      updateOn: 'change'
    });
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
   * retourne la liste des utilisateurs
   * @returns 
   */
   getUsers(){
    return [
      { id: '0001', nom: 'user 1', prenom: 'user 1', username: 'user1', password: 'password', 
        profile: { id: '0002', code: 'USR', libelle: 'USER', description: 'Utilisateur du systeme' } 
      },
      { id: '0002', nom: 'user 2', prenom: 'user 2', username: 'user2', password: 'password',
        profile: { id: '0002', code: 'USR', libelle: 'USER', description: 'Utilisateur du systeme' } 
      }
    ]
  }

  /**
   * retourne la liste des profiles
   * @returns 
   */
   getProfiles(){
    return [
      { id: '0001', code: 'ADM', libelle: 'ADMIN', description: 'Administrateur du systeme' },
      { id: '0002', code: 'USR', libelle: 'USER', description: 'Utilisateur du systeme' }
    ]
  }

  /**
   * click sur le bouton Ajouter du modal pour enregister un utilisateur
   */
   onSubmitForm(){
    console.log(this.userForm.valid);
    // console.log(this.selectedProfile.value);
    if(this.userForm.valid){
      console.log(this.userForm.value);
    }
  }

  /**
   * click sur le bouton Valider du modal pour edition
   */
   onUpdateForm(){
    // console.log(this.code.errors.required);
    if(this.editModeUserForm.valid){
      console.log(this.editModeUserForm.value);
    }
  }

  /**
   * click sur le bouton Fermer du modal
   */
   onModalClose(){
    this.editMode = false;
    this.editModeUserForm.disable();
    this.editModeUserForm.reset();
  }

  /**
   * Fermerture du modal automatique
   */
   closeModalEdit(): void {
    this.closeBtnEdit.nativeElement.click();
  }


  /**
   * click sur le bouton Supprimer pour supprimmer un utilisateur
   */
   deleteProfile(){
    console.log("idUtilisateur => "+this.idEdit.value)
    this.toolService.showConfirmation("Suppression", "Voulez-vous supprimer ce profile ?", "question", "Oui",
      "Non", false).then((result) =>{
        if(result.isConfirmed){
          this.toolService.removeElementFromObjectArray(this.users, this.idEdit.value);
          
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

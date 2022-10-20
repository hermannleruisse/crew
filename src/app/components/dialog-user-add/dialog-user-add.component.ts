import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/profile';
import { Url } from 'src/app/models/url';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-dialog-user-add',
  templateUrl: './dialog-user-add.component.html',
  styleUrls: ['./dialog-user-add.component.scss']
})
export class DialogUserAddComponent implements OnInit {
  userForm: FormGroup;
  profiles: Profile[];
  user: User;

  get nom() { return this.userForm.get("nom"); }
  get prenom() { return this.userForm.get("prenom"); }
  get username() { return this.userForm.get("username"); }
  get password() { return this.userForm.get("password"); }
  get confpass() { return this.userForm.get("confpass"); }
  get selectedProfile() { return this.userForm.get("selectedProfile"); }

  constructor(private formBuilder: FormBuilder, private toolService: ToolService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProfiles();
    this.createUserForm();
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
   * charge le profile selectionné
   */
  changeProfile() {
    console.log(this.selectedProfile.value);
  }

  /**
   * Initialisation du formulaire d'ajout d'un utilisateur avec les validations
   */
  createUserForm() {
    this.userForm = this.formBuilder.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confpass: [null, [Validators.required]],
      selectedProfile: [null, [Validators.required]]
    }, {
      updateOn: 'change'
    });
  }

  /**
   * click sur le bouton Ajouter du modal pour enregister un utilisateur
   */
  onSubmitForm() {
    console.log(this.userForm.valid);
   
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.toolService.showLoading();
      this.user.nom = this.nom.value;
      this.user.prenom = this.prenom.value;
      this.user.username = this.username.value;
      this.user.password = this.password.value;
      this.user.profile = this.selectedProfile.value;
      
      // console.log(this.profileForm.value);
      this.apiService.post(Url.PROFILE_ADD_URL, this.user, {}).subscribe(
        (data) => {
          this.toolService.showToast('Nouveau utilisateur enregistrer', 'OK', 3000);
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

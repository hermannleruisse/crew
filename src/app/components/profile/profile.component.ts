import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { ToolService } from 'src/app/services/tool.service';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { Url } from 'src/app/models/url';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileAddComponent } from '../dialog-profile-add/dialog-profile-add.component';
import { DialogProfileEditComponent } from '../dialog-profile-edit/dialog-profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  editModeProfileForm: FormGroup;
  editFormTitle?:string;
  
  // @ViewChild('closeBtnEdit') closeBtnEdit: ElementRef;
  // @ViewChild('closeBtnAdd') closeBtnAdd: ElementRef;

  profile: Profile = {
    id: '',
    code: '',
    libelle: '',
    description: ''
  };
 
  profilePreview$!: Observable<Profile>;
  // editMode: boolean = false;
  // get code(){ return this.profileForm.get("code");}
  // get libelle(){ return this.profileForm.get("libelle");}
  // get description(){ return this.profileForm.get("description");}

  // get idEdit(){ return this.editModeProfileForm.get("id");}
  // get codeEdit(){ return this.editModeProfileForm.get("code");}
  // get libelleEdit(){ return this.editModeProfileForm.get("libelle");}
  // get descriptionEdit(){ return this.editModeProfileForm.get("description");}

  profiles = [];
  displayedColumns: string[] = ['code', 'libelle', 'description', 'option'];

  constructor(private formBuilder: FormBuilder, private toolService:ToolService, private apiService:ApiService, private authService:AuthService, public dialog: MatDialog) {
  }

  openDialogAddProfile() {
    const dialogRef = this.dialog.open(DialogProfileAddComponent, {
      height: '400px',
      width: '600px',
      disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getProfilesList();
    });
  }

  openDialogEditProfile(profile: Profile) {
    
    const dialogRef = this.dialog.open(DialogProfileEditComponent, { 
      height: '400px',
      width: '600px',
      data : {
        animal : 'panda',
        selectedProfile: profile
      }, disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getProfilesList();
    });
  }

  

  ngOnInit(): void {
    // M.AutoInit();
    console.log("profile");
    // this.createProfilForm();
    // this.editProfilForm();

    this.getProfilesList();

    // this.profilePreview$ = this.profileForm.valueChanges.pipe(
    //   map(formValue => ({
    //     formValue,
    //     code:formValue.code,
    //     libelle:'',
    //     description:''
    //   }))
    // )
  }

  getProfilesList(){
    this.toolService.showLoading();
    this.apiService.get(Url.PROFILE_LIST_URL, {}).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        this.profiles = data;
      }, (error) => {
        console.log('erreur ' + JSON.stringify(error));
        this.toolService.hideLoading();
        // this.toolService.showToast(ToolService.TOAST_ERROR, error.message, 'Profile');
      }, () => {
        this.toolService.hideLoading();
        console.log('complete');
      });
  }

  

  

  // /**
  //  * click sur le bouton Fermer du modal
  //  */
  // onModalClose(){
  //   this.editMode = false;
  //   this.editModeProfileForm.disable();
  //   this.editModeProfileForm.reset();
  // }

  

  // /**
  //  * click sur le bouton Editer pour passer en mode edition
  //  */
  // enableEditMode(){
  //   this.editMode = true;
  //   this.editFormTitle = "Edition";
  //   // this.editModeProfileForm.get("code").enable();
  //   this.editModeProfileForm.enable();
  // }

  /**
   * Fermerture du modal automatique
   */
  // closeModalEdit(): void {
  //   this.closeBtnEdit.nativeElement.click();
  // }
  // closeModalAdd(): void {
  //   this.closeBtnAdd.nativeElement.click();
  // }

  /**
   * click sur le bouton Supprimer pour supprimmer un profile
   */
  deleteProfile(profile: Profile){
    // console.log("idProfile => "+this.idEdit.value)
    this.toolService.showConfirmation("Suppression", "Voulez-vous supprimer ce profile ?", "question", "Oui",
      "Non", false).then((result) =>{
        if(result.isConfirmed){
          this.toolService.showLoading();
          this.apiService.delete(Url.PROFILE_DELETE_URL+"/"+profile.id, {}).subscribe(
            (data) => {
              // this.toolService.removeElementFromObjectArray(this.profiles, this.idEdit.value);
              this.toolService.showToast('Suppression de profile reussie', 'OK', 3000);
              this.getProfilesList();
            }, (error) => {
              this.toolService.hideLoading();
              this.toolService.showToast('Echec de supprèssion', 'OK');
            }, () => {
              this.toolService.hideLoading();
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            '',
            'Suppression anuler :)',
            'error'
          )
        }
      }).finally(()=>{
        //fermerture du modal
        // this.closeModalEdit();
      })
  }

}

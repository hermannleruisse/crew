import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ToolService } from 'src/app/services/tool.service';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { Url } from 'src/app/url';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserAddComponent } from '../dialog-user-add/dialog-user-add.component';
import { DialogUserEditComponent } from '../dialog-user-edit/dialog-user-edit.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  users = [];
  profiles: Profile[];
  
  displayedColumns: string[] = ['nom', 'prenom', 'username', 'profile', 'option'];

  constructor(private toolService:ToolService, private apiService:ApiService, public dialog: MatDialog) {
    
  }

  ngAfterViewInit(): void {
    // this.getProfiles();

  }

  ngOnInit(): void {
    
    // this.editUserForm();
    this.getUsersList();
    // this.editModeUserForm.controls.selectedProfile.patchValue('0001');
  }

  openDialogAddUser() {
    const dialogRef = this.dialog.open(DialogUserAddComponent, {
      height: '400px',
      width: '700px',
      disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getUsersList();
    });
  }

  openDialogEditUser(user: User) {
    
    const dialogRef = this.dialog.open(DialogUserEditComponent, { 
      height: '400px',
      width: '700px',
      data : {
        selectedUser: user
      }, disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getUsersList();
    });
  }

  /**
   * retourne la liste des utilisateurs
   * @returns 
   */
   getUsersList(){
    this.toolService.showLoading();
    this.apiService.get(Url.USER_LIST_URL, {}).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        this.users = data;
      }, (error) => {
        console.log('erreur ' + JSON.stringify(error));
        this.toolService.hideLoading();
        this.toolService.showToast(error.error.message, 'OK');
      }, () => {
        this.toolService.hideLoading();
        console.log('complete');
      });
  }

  /**
   * click sur le bouton Supprimer pour supprimmer un utilisateur
   */
  deleteUser(user: User){
    // console.log("idProfile => "+this.idEdit.value)
    this.toolService.showConfirmation("Suppression", "Voulez-vous supprimer ce utilisateur ?", "question", "Oui",
      "Non", false).then((result) =>{
        if(result.isConfirmed){
          this.toolService.showLoading();
          this.apiService.delete(Url.USER_DELETE_URL+"/"+user.id, {}).subscribe(
            (data) => {
              this.toolService.showToast('Suppression reussie', 'OK', 3000);
              this.getUsersList();
            }, (error) => {
              this.toolService.hideLoading();
              this.toolService.showToast(error.error.message, 'OK');
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
        this.getUsersList();
      })
  }


}

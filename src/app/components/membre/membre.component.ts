import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Membre } from 'src/app/models/membre';
import { Ministere } from 'src/app/models/ministere';
import { Url } from 'src/app/url';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';
import Swal from 'sweetalert2';
import { DialogMembreAddComponent } from '../dialog-membre-add/dialog-membre-add.component';
import { DialogMembreEditComponent } from '../dialog-membre-edit/dialog-membre-edit.component';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.scss']
})
export class MembreComponent implements OnInit {
  members = [];
  ministers: Ministere[];
  
  displayedColumns: string[] = ['nom', 'prenom', 'telephone', 'sexe', 'option'];
  constructor(private toolService:ToolService, private apiService:ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMembersList();
  }

  openDialogAddMember() {
    const dialogRef = this.dialog.open(DialogMembreAddComponent, {
      height: '80vh',
      width: '80vw',
      disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getMembersList();
    });
  }

  openDialogEditMember(member: Membre) {
    
    const dialogRef = this.dialog.open(DialogMembreEditComponent, { 
      height: '80vh',
      width: '80vw',
      data : {
        selectedMember: member
      }, disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getMembersList();
    });
  }

  /**
   * retourne la liste des utilisateurs
   * @returns 
   */
   getMembersList(){
    this.toolService.showLoading();
    this.apiService.get(Url.MEMBR_LIST_URL, {}).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        this.members = data;
      }, (error) => {
        console.log('erreur ' + JSON.stringify(error));
        this.toolService.hideLoading();
        this.toolService.showToast(error.message, 'OK');
      }, () => {
        this.toolService.hideLoading();
        console.log('complete');
      });
  }

  /** 
   * click sur le bouton Supprimer pour supprimmer un membre
   */
  deleteMember(member: Membre){
    // console.log("idProfile => "+this.idEdit.value)
    this.toolService.showConfirmation("Suppression", "Voulez-vous supprimer ce membre ?", "question", "Oui",
      "Non", false).then((result) =>{
        if(result.isConfirmed){
          this.toolService.showLoading();
          this.apiService.delete(Url.MEMBR_DELETE_URL+"/"+member.id, {}).subscribe(
            (data) => {
              this.toolService.showToast('Suppression réussie', 'OK', 3000);
              this.getMembersList();
            }, (error) => {
              this.toolService.hideLoading();
              this.toolService.showToast(error.message, 'OK');
            }, () => {
              this.toolService.hideLoading();
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            '',
            'Suppression annuler :)',
            'error'
          )
        }
      }).finally(()=>{
        this.getMembersList();
      })
  }

}

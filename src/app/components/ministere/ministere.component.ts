import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Ministere } from 'src/app/models/ministere';
import { ToolService } from 'src/app/services/tool.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogMinisterAddComponent } from '../dialog-minister-add/dialog-minister-add.component';
import { ApiService } from 'src/app/services/api.service';
import { DialogMinisterEditComponent } from '../dialog-minister-edit/dialog-minister-edit.component';
import { Url } from 'src/app/url';

@Component({
  selector: 'app-ministere',
  templateUrl: './ministere.component.html',
  styleUrls: ['./ministere.component.scss']
})
export class MinistereComponent implements OnInit {
  
  minister: Ministere = {
    id: '',
    code: '',
    libelle: '',
    description: ''
  };
 
  ministeres = [];
  displayedColumns: string[] = ['code', 'libelle', 'description', 'option'];

  constructor(private toolService:ToolService, private apiService:ApiService, public dialog: MatDialog) {
  }

  openDialogAddMinister() {
    const dialogRef = this.dialog.open(DialogMinisterAddComponent, {
      height: '400px',
      width: '600px',
      disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getMinistersList();
    });
  }

  openDialogEditMinister(minister: Ministere) {
    
    const dialogRef = this.dialog.open(DialogMinisterEditComponent, { 
      height: '400px',
      width: '600px',
      data : {
        selectedMinister: minister
      }, disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getMinistersList();
    });
  }

  ngOnInit(): void {
    this.getMinistersList();
  }

  getMinistersList(){
    this.toolService.showLoading();
    this.apiService.get(Url.MINIS_LIST_URL, {}).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        this.ministeres = data;
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
   * click sur le bouton Supprimer pour supprimmer un ministère
   */
  deleteMinister(minister: Ministere){
    // console.log("id => "+this.idEdit.value)
    this.toolService.showConfirmation("Suppression", "Voulez-vous supprimer ce élément ?", "question", "Oui",
      "Non", false).then((result) =>{
        if(result.isConfirmed){
          this.toolService.showLoading();
          this.apiService.delete(Url.MINIS_DELETE_URL+"/"+minister.id, {}).subscribe(
            (data) => {
              this.toolService.showToast('Suppression réussie', 'OK', 3000);
              this.getMinistersList();
            }, (error) => {
              this.toolService.hideLoading();
              this.toolService.showToast(error.message, 'OK');
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
        this.getMinistersList();
      })
  }

}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Membre } from '../../models/membre';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ministere } from 'src/app/models/ministere';
import { ToolService } from 'src/app/services/tool.service';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Url } from 'src/app/url';
import { DialogMembreEditComponent } from '../dialog-membre-edit/dialog-membre-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogMembreAddComponent } from '../dialog-membre-add/dialog-membre-add.component';

@Component({
  selector: 'app-membre-list',
  templateUrl: './membre-list.component.html',
  styleUrls: ['./membre-list.component.scss']
})
export class MembreListComponent implements OnInit {
  membres!:Membre[];

  constructor(private toolService:ToolService, private apiService:ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    // of(this.getMembres()).subscribe(membres => {
    //   this.membres = membres;
    // });

  }

  openDialogAddMember() {
    const dialogRef = this.dialog.open(DialogMembreAddComponent, {
      height: '400px',
      width: '600px',
      disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getMembres();
    });
  }

  openDialogEditMember(member: Membre) {
    
    const dialogRef = this.dialog.open(DialogMembreEditComponent, { 
      height: '400px',
      width: '600px',
      data : {
        selectedMember: member
      }, disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getMembres();
    });
  }

  getMembres(){
    return [
      {
        id: '0001',
        nom: 'AKAKPO',
        prenom: 'Adje',
        sexe: 'M',
        dateDeNaissance:'',
        adresse:'Lome',
        telephone:'0022892106475',
        photo:'',
        ministere: { id: '0001', code: 'MJEU', libelle: 'JEUNE', description: 'Ministere des jeunes' } 
      },
      {
        id: '0002',
        nom: 'AKAKPO1',
        prenom: 'Adjele',
        sexe: 'F',
        dateDeNaissance:'',
        adresse:'Lome',
        telephone:'0022898718111',
        photo:'',
        ministere: { id: '0002', code: 'MHOM', libelle: 'HOMME', description: 'Ministere des hommes' }
      },
      {
        id: '0003',
        nom: 'AKAKPO1',
        prenom: 'Adjele',
        sexe: 'F',
        dateDeNaissance:'',
        adresse:'Lome',
        telephone:'0022898718111',
        photo:'',
        ministere: { id: '0002', code: 'MHOM', libelle: 'HOMME', description: 'Ministere des hommes' }
      },
      {
        id: '0004',
        nom: 'AKAKPO1',
        prenom: 'Adjele',
        sexe: 'F',
        dateDeNaissance:'',
        adresse:'Lome',
        telephone:'0022898718111',
        photo:'',
        ministere: { id: '0002', code: 'MHOM', libelle: 'HOMME', description: 'Ministere des hommes' }
      },
      {
        id: '0005',
        nom: 'AKAKPO1',
        prenom: 'Adjele',
        sexe: 'F',
        dateDeNaissance:'',
        adresse:'Lome',
        telephone:'0022898718111',
        photo:'',
        ministere: { id: '0002', code: 'MHOM', libelle: 'HOMME', description: 'Ministere des hommes' }
      },
      {
        id: '0006',
        nom: 'AKAKPO1',
        prenom: 'Adjele',
        sexe: 'F',
        dateDeNaissance:'',
        adresse:'Lome',
        telephone:'0022898718111',
        photo:'',
        ministere: { id: '0002', code: 'MHOM', libelle: 'HOMME', description: 'Ministere des hommes' }
      }
    ]
  }

  /**
   * click sur le bouton Supprimer pour supprimmer un membre
   */
  deleteUser(member: Membre){
    // console.log("idMembre => "+member.id);
    this.toolService.showConfirmation("Suppression", "Voulez-vous supprimer ce element ?", "question", "Oui",
      "Non", false).then((result) =>{
        if(result.isConfirmed){
          this.toolService.showLoading();
          this.apiService.delete(Url.MEMBR_DELETE_URL+"/"+member.id, {}).subscribe(
            (data) => {
              this.toolService.showToast('Suppression reussie', 'OK', 3000);
              this.getMembres();
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
        this.getMembres();
      })
  }

}

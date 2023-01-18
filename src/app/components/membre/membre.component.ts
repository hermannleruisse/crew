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
import { DialogMembreDetailComponent } from '../dialog-membre-detail/dialog-membre-detail.component';
import { PageEvent } from '@angular/material/paginator';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.scss']
})
export class MembreComponent implements OnInit {
  // @ViewChild(MatAccordion) accordion: MatAccordion;
  members = [];
  ministers: Ministere[];
  totalElements: number = 0;
  recherche: string = '';
  minister: string = '';
  sexe: string = '';
  
  displayedColumns: string[] = ['nom', 'prenom', 'telephone', 'sexe', 'option'];
  constructor(private toolService:ToolService, private apiService:ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.accordion.openAll();
    // this.getMembersList();
    this.getMinisteres();
    this.getMembers({ page: "0", size: "5"});
  }

  /**
   * retourne la liste des ministeres
   * @returns 
   */
   getMinisteres(){
    this.apiService.get(Url.MINIS_LIST_URL, {})
      .subscribe((data) => {
        this.ministers = data;
      });
  }

  openDialogAddMember() {
    const dialogRef = this.dialog.open(DialogMembreAddComponent, {
      height: '80vh',
      width: '80vw',
      disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.getMembersList();
      this.getMembers({ page: "0", size: "5"});
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
      // this.getMembersList();
      this.getMembers({ page: "0", size: "5"});
    });
  }

  initializeSearch(){
    this.recherche ='';
    this.sexe ='';
    this.minister ='';
    this.getMembers({ page: "0", size: "5"});
  }

  openDialogDetailMember(member: Membre){
    
    const dialogRef = this.dialog.open(DialogMembreDetailComponent, { 
      height: '95vh',
      width: '95vw',
      data : {
        selectedMember: member
      }, disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * retourne la liste des membres
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
        this.toolService.showToast(error.error.message, 'OK');
      }, () => {
        this.toolService.hideLoading();
        console.log('complete');
      });
  }

  /**
   * lance la recherche lors de la saisie dans les champs de recherche
   * @param recherche 
   */
  searchMot(recherche){
    console.log("recherche search "+recherche);
    console.log("minister search "+this.minister);
    console.log("sexe search "+this.sexe);
    if(typeof this.sexe === 'undefined'){
      this.sexe = "";
    }

    if(typeof this.minister === 'undefined'){
      this.minister = "";
    }

    if(recherche.length >= 3 || this.sexe?.length > 0 || this.minister?.length > 0){
      this.getMembersBySearch(recherche, { page: "0", size: "10", sexe: this.sexe, minister:this.minister});
    }else if(recherche.length == 0){
      this.getMembers({ page: "0", size: "5"});
    }
  }

  /**
   * retourne la liste des membres avec pagination en fonction des mot clé
   * @param request 
   */
  getMembersBySearch(search?: string, request?){
    const params = request;
    this.toolService.showLoading();
    
      this.apiService.get(Url.MEMBR_SEARCH_MULTI_LIST_PAGINATE_URL+"/"+search, {params}).subscribe(
        (data) => {
          // console.log('data => ' + JSON.stringify(data));
          this.members = data.content;
          this.totalElements = data?.totalElements;
        }, (error) => {
          // console.log('erreur ' + JSON.stringify(error));
          this.toolService.hideLoading();
          this.toolService.showToast(error.error.message, 'OK');
        }, () => {
          this.toolService.hideLoading();
          console.log('complete');
        });
    
  }

  /**
   * retourne la liste des membres avec pagination
   * @param request 
   */
  getMembers(request){
    const params = request;
    this.toolService.showLoading();
    this.apiService.get(Url.MEMBR_LIST_PAGINATE_URL, {params}).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        this.members = data.content;
        this.totalElements = data?.totalElements;
      }, (error) => {
        console.log('erreur ' + JSON.stringify(error));
        this.toolService.hideLoading();
        this.toolService.showToast(error.error.message, 'OK');
      }, () => {
        this.toolService.hideLoading();
        console.log('complete');
      });
  }

  nextPage(event: PageEvent){
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getMembers(request);
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
              this.toolService.showToast(error.error.message, 'OK');
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
        this.getMembers({ page: "0", size: "5"});
      })
  }

  print(){
    const params = {nomPrenom: this.recherche, sexe: this.sexe, minister:this.minister};
    this.toolService.showLoading();
    this.apiService.export(Url.MEMBR_PRINT_URL, {params}).subscribe(
      (data) => {
        let blob:any = new Blob([data], { type: 'application/pdf'});
        saveAs(blob, 'member_list.pdf');
      }, (error) => {
        this.toolService.hideLoading();
        this.toolService.showToast(error.error.message, 'OK');
      }, () => {
        this.toolService.hideLoading();
        console.log('complete');
      });
  }

  download() {
    const params = {nomPrenom: this.recherche, sexe: this.sexe, minister:this.minister};
    this.apiService.export(Url.MEMBR_PRINT_URL, {params}).subscribe(
      (response: any) => { //when you use stricter type checking
      console.log('fichier =>'+JSON.stringify(response));
			let blob:any = new Blob([response], { type: 'application/pdf'});
			//window.open(url);
			//window.location.href = response.url;
			saveAs(blob, 'member_list.pdf');
		}), 
    (error: any) => console.log('Error downloading the file'), 
    //when you use stricter type checking
    () => console.info('File downloaded successfully');
  }

}

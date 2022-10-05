import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Membre } from '../../models/membre';
// import * as M from 'materialize-css';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ministere } from 'src/app/models/ministere';
import { ToolService } from 'src/app/services/tool.service';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membre-list',
  templateUrl: './membre-list.component.html',
  styleUrls: ['./membre-list.component.scss']
})
export class MembreListComponent implements OnInit, AfterViewInit {
  membres!:Membre[];
  @ViewChild('closeBtnEdit') closeBtnEdit: ElementRef;
  instance:any;
  instance1:any;
  url = "./assets/img/avatar.png";
  selectedFile:File = null;
  memberForm: FormGroup;
  editModeMemberForm: FormGroup;
  editMode: boolean = false;
  editFormTitle?:string;
  ministeres: Ministere[];

  get nom(){ return this.memberForm.get("nom");}
  get prenom(){ return this.memberForm.get("prenom");}
  get dateNaissance(){ return this.memberForm.get("dateNaissance");}
  get adresse(){ return this.memberForm.get("adresse");}
  get telephone(){ return this.memberForm.get("telephone");}
  get photo(){ return this.memberForm.get("photo");}
  get selectedMinister(){ return this.memberForm.get("selectedMinister");}
  get selectedSexe(){ return this.memberForm.get("selectedSexe");}

  get idEdit(){ return this.editModeMemberForm.get("id");}
  get nomEdit(){ return this.editModeMemberForm.get("nom");}
  get prenomEdit(){ return this.editModeMemberForm.get("prenom");}
  get dateNaissanceEdit(){ return this.editModeMemberForm.get("dateNaissance");}
  get adresseEdit(){ return this.editModeMemberForm.get("adresse");}
  get telephoneEdit(){ return this.editModeMemberForm.get("telephone");}
  get photoEdit(){ return this.editModeMemberForm.get("photo");}
  get selectedMinisterEdit(){ return this.editModeMemberForm.get("selectedMinister");}
  get selectedSexeEdit(){ return this.editModeMemberForm.get("selectedSexe");}

  constructor(private formBuilder: FormBuilder, private toolService:ToolService, private apiService:ApiService) { }

  ngAfterViewInit(): void {
    // this.instance = M.AutoInit();
    // this.instance1 = M.Modal.init(document.querySelectorAll('.modal'), {
    //   dismissible : false
    // });
    // this.instance = M.FormSelect.init(document.querySelector('select'));
    // this.instance1 = M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {
    //   direction : 'left',
    //   hoverEnabled: false
    // });

  }

  ngOnInit() {
    this.createMemberForm();
    this.editMemberForm();

    //async ministere
    of(this.getMinisteres()).subscribe(ministeres => {
      this.ministeres = ministeres;
    });

    of(this.getMembres()).subscribe(membres => {
      this.membres = membres;
    });

  }

  /**
   * Initialisation du formulaire d'ajout d'un membre avec les validations
   */
  createMemberForm(){
    this.memberForm = this.formBuilder.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      dateNaissance: [null, [Validators.required]],
      selectedSexe: [null, [Validators.required]],
      adresse: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      selectedMinister:[null, [Validators.required]],
      photo:[null, [Validators.required]]
    },{
      updateOn: 'change'
    });
  }

  /**
   * Initialisation du formulaire d'edition d'un membre avec les validations
   */
   editMemberForm(){
    this.editModeMemberForm = this.formBuilder.group({
      id: [{ value: '', disabled:true}],
      nom: [{ value: '', disabled:true}, [Validators.required]],
      prenom: [{ value: '', disabled:true}, [Validators.required]],
      dateNaissance: [{ value: '', disabled:true}, [Validators.required]],
      selectedSexe: [{ value: '', disabled:true}, [Validators.required]],
      adresse: [{ value: '', disabled:true}, [Validators.required]],
      telephone: [{ value: '', disabled:true}, [Validators.required]],
      selectedMinister:[{ value: '', disabled:true}, [Validators.required]],
      photo:[{ value: '', disabled:false}, [Validators.required]]
    },{
      updateOn: 'change'
    });
  }

  /**
   * 
   * @param membre 
   * reccuperer le membre actuel en cliquant sur une ligne du tableau 
   */
   getCurrentMembre(membre: Membre){
    this.editFormTitle = "Detail";
    this.editModeMemberForm.get("id").setValue(membre.id);
    this.editModeMemberForm.get("nom").setValue(membre.nom);
    this.editModeMemberForm.get("prenom").setValue(membre.prenom);
    this.editModeMemberForm.get("dateNaissance").setValue(membre.dateDeNaissance);
    this.editModeMemberForm.get("selectedSexe").setValue(membre.sexe);
    this.editModeMemberForm.get("adresse").setValue(membre.adresse);
    this.editModeMemberForm.get("telephone").setValue(membre.telephone);
    this.editModeMemberForm.get("selectedMinister").setValue(membre.ministere.id);
    this.editModeMemberForm.get("photo").setValue(membre.photo);
    
    if(membre != null){
      console.log(membre);
    }
  }

  /**
   * retourne la liste des ministeres
   * @returns 
   */
  getMinisteres(){
    return [
      { id: '0001', code: 'MJEU', libelle: 'JEUNE', description: 'Ministere des jeunes' },
      { id: '0002', code: 'MHOM', libelle: 'HOMME', description: 'Ministere des hommes' }
    ]
  }

  getMembres(){
    return [
      {
        id: '0001',
        nom: 'AKAKPO',
        prenom: 'Adje',
        sexe: 'M',
        dateDeNaissance:new Date(),
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
        dateDeNaissance:new Date(),
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
        dateDeNaissance:new Date(),
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
        dateDeNaissance:new Date(),
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
        dateDeNaissance:new Date(),
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
        dateDeNaissance:new Date(),
        adresse:'Lome',
        telephone:'0022898718111',
        photo:'',
        ministere: { id: '0002', code: 'MHOM', libelle: 'HOMME', description: 'Ministere des hommes' }
      }
    ]
  }

  onSelectFile(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.selectedFile = <File> e.target.files[0];
      console.log("file "+JSON.stringify(this.selectedFile.name.split('.').pop()));
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
   * click sur le bouton Ajouter du modal pour enregister un membre
   */
   onSubmitForm(){
    console.log(this.memberForm.valid);
    // console.log(this.selectedProfile.value);
    if(this.memberForm.valid){
      console.log(this.memberForm.value);
    }
  }

  /**
   * click sur le bouton Editer pour passer en mode edition
   */
   enableEditMode(){
    this.editMode = true;
    this.editFormTitle = "Edition";
    this.editModeMemberForm.enable();
  }

  /**
   * click sur le bouton Valider du modal pour edition
   */
   onUpdateForm(){
    // console.log(this.code.errors.required);
    if(this.editModeMemberForm.valid){
      console.log(this.editModeMemberForm.value);
    }
  }

  /**
   * click sur le bouton Fermer du modal
   */
   onModalClose(){
    this.editMode = false;
    this.editModeMemberForm.disable();
    this.editModeMemberForm.reset();
  }

  /**
   * Fermerture du modal automatique
   */
   closeModalEdit(): void {
    this.closeBtnEdit.nativeElement.click();
  }


  /**
   * click sur le bouton Supprimer pour supprimmer un membre
   */
   deleteProfile(){
    console.log("idMembre => "+this.idEdit.value)
    this.toolService.showConfirmation("Suppression", "Voulez-vous supprimer ce membre ?", "question", "Oui",
      "Non", false).then((result) =>{
        if(result.isConfirmed){
          this.toolService.removeElementFromObjectArray(this.membres, this.idEdit.value);
          
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

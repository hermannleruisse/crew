import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Membre } from 'src/app/models/membre';
import { Ministere } from 'src/app/models/ministere';
import { Url } from 'src/app/models/url';
import { ApiService } from 'src/app/services/api.service';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-dialog-membre-add',
  templateUrl: './dialog-membre-add.component.html',
  styleUrls: ['./dialog-membre-add.component.scss']
})
export class DialogMembreAddComponent implements OnInit {
  url = "./assets/img/avatar1.png";
  selectedFile:File = null;
  member: Membre = {
    id: '',
    nom : '',
    prenom : '',
    sexe: '',
    dateDeNaissance : '',
    adresse : '',
    ministere : '',
    telephone : '',
    photo : ''
  };
  memberForm: FormGroup;
  ministeres: Ministere[];

  get nom(){ return this.memberForm.get("nom");}
  get prenom(){ return this.memberForm.get("prenom");}
  get dateNaissance(){ return this.memberForm.get("dateNaissance");}
  get adresse(){ return this.memberForm.get("adresse");}
  get telephone(){ return this.memberForm.get("telephone");}
  get photo(){ return this.memberForm.get("photo");}
  get selectedMinister(){ return this.memberForm.get("selectedMinister");}
  get selectedSexe(){ return this.memberForm.get("selectedSexe");}

  constructor(private formBuilder: FormBuilder, private toolService:ToolService, private apiService:ApiService) { }

  ngOnInit(): void {
    this.createMemberForm();
    //async ministere
    this.getMinisteres();
  }

  /**
   * retourne la liste des ministeres
   * @returns 
   */
   getMinisteres(){
    this.apiService.get(Url.MINIS_LIST_URL, {})
      .subscribe((data) => {
        this.ministeres = data;
      });
  }

  onSelectFile(e){
    // https://refine.dev/blog/how-to-base64-upload/
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.selectedFile = <File> e.target.files[0];
      console.log("selectedFile =>"+JSON.stringify(e));
      console.log("file =>"+JSON.stringify(this.selectedFile.name.split('.').pop()));
      reader.onload = (event:any)=>{
        console.log("base64 =>"+JSON.stringify(event.target.result));
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
   * click sur le bouton Ajouter du modal pour enregister un membre
   */
   onSubmitForm(){
    console.log(this.memberForm.valid);
    // console.log(this.selectedProfile.value);
    
    if(this.memberForm.valid){
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);

      this.toolService.showLoading();

      this.member.nom = this.nom.value;
      this.member.prenom = this.prenom.value;
      this.member.adresse = this.adresse.value;
      this.member.dateDeNaissance = this.dateNaissance.value;
      this.member.ministere = this.selectedMinister.value;
      this.member.sexe = this.selectedSexe.value;
      this.member.photo = this.url;
      this.member.telephone = this.telephone.value;

      // fd.append('member', JSON.stringify(this.member));
      
      this.apiService.post(Url.MEMBR_ADD_URL, this.member, {}).subscribe(
        (data) => {
          this.toolService.showToast('Enregistrement réussie', 'OK', 3000);
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

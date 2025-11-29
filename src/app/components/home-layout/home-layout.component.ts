import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Url } from 'src/app/url';

export interface CheckHabilitation{
  profile: string,
  permission: string
}

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  url_img:string = 'assets/img/avatar1.png'
  // https://source.unsplash.com/c_GmwfHBDzk/200x200

  checkhabilitation: CheckHabilitation = {
    profile: '',
    permission: '',
  };

  constructor(public authService: AuthService, private apiService: ApiService) { }

  ngOnInit(): void {
    
  }

  /**
   * vérifie si le profil est habilité
   * @returns
   */
   checkAuthority(permission:string):boolean{
    // this.checkhabilitation.profile = profile;
    // this.checkhabilitation.permission = permission;

    this.apiService.post(Url.HABILIT_CHECK_URL, permission, {}).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        return data;
      }, (error) => {
        console.log('erreur ' + JSON.stringify(error));
      });
      return false;
  }


}

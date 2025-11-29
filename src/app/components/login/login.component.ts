import { HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // authStatus: boolean;
  hide = true;
  loginUserData = {
    login: '',
    password: ''
  };

  constructor(private toolService: ToolService, 
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  seConnecter(form: NgForm){
    if(form.value.login != '' && form.value.password != ''){
      this.loginUser(form.value.login, form.value.password);
    }else{
      this.toolService.showToast('Login ou mot de passe incorrecte', 'OK', 3000);
    }
  }

  loginUser(login:string, pass:string) {
    console.log('username => ' + this.loginUserData.login + ' password => ' + this.loginUserData.password);
    this.toolService.showLoading();
    this.authService.onSignIn(this.loginUserData.login, this.loginUserData.password).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data.body?.user));
        this.toolService.hideLoading();
        if(data.body.user == undefined){
          this.toolService.showToast(data.body.message, 'OK');
        }else{
          localStorage.setItem('token', data.headers.get("Authorization"));
          localStorage.setItem('username', data.body.user?.username);
          localStorage.setItem('profile', data.body.user?.profile?.libelle);
          localStorage.setItem('permission', data.body.user?.permission);
          this.router.navigateByUrl('/home');
        }
      }, (error) => {
        this.toolService.hideLoading();
        this.toolService.showToast(error.message, 'OK');
      }, () => {
        this.toolService.hideLoading();
      });
  }
}

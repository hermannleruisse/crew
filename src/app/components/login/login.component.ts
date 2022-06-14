import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // authStatus: boolean;
  loginUserData = {
    login: '',
    password: ''
  };

  constructor(private toolService: ToolService, private toastrService: ToastrService, 
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.toolService.showLoading();
  }

  seConnecter(form: NgForm){
    console.log(form.value.login);
    this.loginUser(form.value.login, form.value.password);
  }

  loginUser(login:string, pass:string) {
    console.log('username => ' + this.loginUserData.login + ' password => ' + this.loginUserData.password);
    this.toolService.showLoading();
    this.toastrService.clear();
    this.authService.onSignIn(this.loginUserData.login, this.loginUserData.password).subscribe(
      (data) => {
        console.log('data => ' + JSON.stringify(data));
        this.toolService.hideLoading();
        this.router.navigateByUrl('/home');
        // this.router.navigate(['home']);
        this.toolService.showToast(ToolService.TOAST_INFO, data.message, 'Connexion');
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('permission', data.permission);
      }, (error) => {
        console.log('erreur ' + JSON.stringify(error));
        this.toolService.hideLoading();
        this.toolService.showToast(ToolService.TOAST_ERROR, error.message, 'Connexion');
      }, () => {
        this.toolService.hideLoading();
        console.log('complete');
      });
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
  private static LOGIN_URL = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient, private router: Router) { }

  public onSignIn(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Bearer ' + '');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.post(AuthService.LOGIN_URL, { 'username': username, 'password': password },
      { headers: headers, responseType: 'json' }
    );
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('permission');
    this.router.navigate(['login']);
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUsername() {
    return localStorage.getItem('username');
  }
}
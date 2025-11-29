import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Url } from "../url";

@Injectable({
    providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient, private router: Router) { }
  isLoggedIn = new BehaviorSubject(false);

  public onSignIn(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    return this.http.post(Url.LOGIN_URL, { 'username': username, 'password': password },
      { headers: headers, responseType: 'json', observe: 'response' }
    );
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('permission');
    localStorage.removeItem('profile');
    this.isLoggedIn.next(false);
    this.router.navigate(['login']);
  }

  public loggedIn(): boolean {
    this.isLoggedIn.next(true);
    return !!localStorage.getItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUsername() {
    return localStorage.getItem('username');
  }

  public getProfile() {
    return localStorage.getItem('profile');
  }
}
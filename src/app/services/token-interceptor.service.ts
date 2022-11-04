import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
    constructor(private router: Router, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const authService = this.injector.get(AuthService);
    // Authorization: `Bearer ${this.authService.getToken()}`,
    let tokenizedReq = req.clone({
      setHeaders: {
        'Authorization': `${this.authService.getToken()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

    // console.log('Before making call ' + JSON.stringify(req.body));

    return next.handle(tokenizedReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', JSON.stringify(event));
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          message: error && error.message ? error.message : '',
          status: error.status
        };
        switch (error.status) {
          case 500:
            // TODO:this.router.navigateByUrl('/login');
            break;
          case 403:
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('permission');
            this.router.navigateByUrl('/login');
            break;
          case 404:
            // TODO:this.router.navigateByUrl('/login');
            break;
          default:
            break;
        }
        console.log('erreur <=> ' + JSON.stringify(error));
          // this.router.navigate(['login']);
         return throwError(error);
      }));
    }
}
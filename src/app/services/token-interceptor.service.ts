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
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
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

        console.log('erreur <=> ' + JSON.stringify(error));
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('permission');
          // this.router.navigate(['login']);
        this.router.navigateByUrl('/login');
        // throw new Error("Method not implemented."+error);
         return throwError(error);
      }));

        // throw new Error("Method not implemented.");
    }
}
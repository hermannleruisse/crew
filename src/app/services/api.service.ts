import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService{

    constructor(private httpClient: HttpClient) { }

    public post(url: string, body: any, option: any): Observable<any> {
        return this.httpClient.post(url, body, option);
    }

    public put(url: string, body: any, option: any): Observable<any> {
      return this.httpClient.put(url, body, option);
    }

    public delete(url: string, option: any): Observable<any> {
      return this.httpClient.delete(url, option);
    }

    public get(url: string, option: any): Observable<any> {
      return this.httpClient.get(url, option);
    }

}
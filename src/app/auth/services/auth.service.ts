import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { Auth } from '../interfaces/aut.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http:HttpClient) { }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).
           pipe(
              tap( resp => this._auth = resp),
              tap( resp => localStorage.setItem('id', resp.id))
           );
  }

  logOut(){
    this._auth = undefined;
  }

  verificaAutencicacion():Observable<boolean>{
    if ( !localStorage.getItem('id')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map( auth => {
        console.log('map', auth);
        this._auth = auth;
        return true;
      })
    );
  }

  get auth():Auth{
    return {...this._auth!}
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroe(id:string):Observable<Heroe>{
    console.log(id);
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${ id }`);
  }

  //http://localhost:3000/heroes?q=arr&_limit=5
  getHeroesSuggest(text:string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${text}&_limit=5`);
  }

  addHeroe(heroe:Heroe):Observable<Heroe>{
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe)
  }

  editHeroe(heroe:Heroe):Observable<Heroe>{
    return this.http.put<Heroe>(`${ this.baseUrl }/heroes/${heroe.id}`, heroe);
  }

  
  deleteHeroe(id:string):Observable<any>{
    return this.http.delete<any>(`${ this.baseUrl }/heroes/${id}`);
  }
}

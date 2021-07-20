import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements /*CanActivate,*/ CanLoad {
 

  constructor( private authService: AuthService,
               private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
  /*     if (this.authService.auth.id){
        return true;
      }
  
      console.log('BLOQUEADO ACTIVATE');
      return false; */

      return this.authService.verificaAutencicacion()
             .pipe(tap(siAuth => {
               if (!siAuth){
                  this.router.navigate(['./auth/login']); 
               }
             }));
  } 
 
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    
/*     if (this.authService.auth.id){
      return true;
    }

    console.log('BLOQUEADO LOAD');
    return false; */

    return this.authService.verificaAutencicacion()
    .pipe(tap(siAuth => {
      if (!siAuth){
         this.router.navigate(['./auth/login']); 
      }
    }));
  }
}

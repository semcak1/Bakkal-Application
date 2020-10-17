import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";

import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root",
})
export class AuthguardGuard implements CanActivate {
  userData: any;
  constructor(private router: Router, private afAuth: AngularFireAuth,private authService:AuthService) {
   
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.authService.isLoggedIn !==true ) { 
      this.router.navigate(['/login'])
      window.alert('yönlendirme başarısız login sayfasına yönlendiriyorsunuz')     
      return false;
      
    }else{
         
      return true;
    }
  }
}

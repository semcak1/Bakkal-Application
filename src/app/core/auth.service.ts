import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth'
import { auth } from 'firebase';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private afAuth:AngularFireAuth,
    private router:Router
  ) {
  
   }

   saveToLocalStorage(value){  
      
      if (value) {
        this.userData = value;
        console.log(this.userData)
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    
   }

  doRegister(value){
    return new Promise<any>((resolve,reject)=>{
      firebase.auth().createUserWithEmailAndPassword(value.email,value.password)
      .then(res=>{
        resolve(res);
      },err=>reject(err))
    })
  }

  signOut(){
    return this.afAuth.auth.signOut().then(()=>{
      localStorage.removeItem('user')
      this.router.navigate(['/login'])
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.uid !== false) ? true : false;
  }
}

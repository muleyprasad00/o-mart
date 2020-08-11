import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { AppUser } from './../models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>;
  constructor(
    private afAuth:AngularFireAuth,
    private route:ActivatedRoute,
    private userService:UserService,
    private router:Router    
     ) { 
    this.user$ = afAuth.authState;
  }

login(){
  let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  localStorage.setItem('returnUrl', returnUrl);
  
  this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
}

logout(){
  this.afAuth.signOut();
  this.router.navigateByUrl('/login')
}

get appUser$(): Observable<AppUser>{
  return this.user$
    .pipe(switchMap(user =>{
      if(user) return  this.userService.get(user.uid).valueChanges();
      return of(null);
    }))
}

}

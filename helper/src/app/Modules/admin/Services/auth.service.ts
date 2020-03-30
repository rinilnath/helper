import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  volunteerisLoggedIn = true;
  redirectUrl: string;

  constructor(public auth: AngularFireAuth,) { }

  register(email,password){
    return this.auth.createUserWithEmailAndPassword(email,password)
  }
  signin(email,password){
    return this.auth.signInWithEmailAndPassword(email,password)
  }
  signout(){
    return this.auth.signOut()
  }

  getUser(){
    this.auth.user.subscribe(data=>data.uid)
  }
  
  // getUserDetails() {
  //   this.auth.user.subscribe(data=> {
  //     localStorage.setItem("userId",data.uid)
  //     //return data;
  //   });
  // }

  login(): void {
    this.volunteerisLoggedIn = true;
  }

  logout(): void {
    this.volunteerisLoggedIn = false;
  }

}

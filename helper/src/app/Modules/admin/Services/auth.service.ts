import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as CryptoJS from 'crypto-js';
declare var $: any;
declare var toastr: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  redirectUrl: string;

  constructor(public auth: AngularFireAuth, ) { }

  register(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }
  signin(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  signout() {
    return this.auth.signOut()
  }

  getUser() {
    this.auth.user.subscribe(data => data.uid)
  }

  resetPass(email){
    this.auth.sendPasswordResetEmail(email).then(
      () => {        
        toastr.success("Password reset mail send")
      },
      err => {
        toastr.error("Failed to send mail check your mail address")
      });
  }

  // getUserDetails() {
  //   this.auth.user.subscribe(data=> {
  //     localStorage.setItem("userId",data.uid)
  //     //return data;
  //   });
  // }

  checkLogin(): Boolean {
    if (localStorage.getItem("userId")) {
      let a = CryptoJS.AES.decrypt(localStorage.getItem("userId"), "akalgorija").toString(CryptoJS.enc.Utf8);
      let b = CryptoJS.AES.decrypt(sessionStorage.getItem("key"), "jarigoalak").toString(CryptoJS.enc.Utf8);
      if (a == b) {
        return true;
      }
    }
    return false;
  }
}

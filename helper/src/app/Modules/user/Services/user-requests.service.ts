import { Injectable } from '@angular/core';
import { UserRequest } from './userRequest.model';
import { AngularFirestore } from '@angular/fire/firestore';
import "firebase/firestore"
@Injectable({
  providedIn: 'root'
})
export class UserRequestsService {

  public userRequestFormData: UserRequest;
  

  constructor(public fire: AngularFirestore) {
  }

  addRequest(data: any) {
    this.fire.collection("userRequest").add(data);
  }

  getRequest(mobile) {
    return this.fire.collection("userRequest",ref=>ref.where('mobile','==',mobile));
  }

  getLocalBodies() {
    return this.fire.collection("localbodies");
  }

  get windowRef() {
    return window;
  }
}

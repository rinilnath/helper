import { Injectable } from '@angular/core';
import { UserRequest } from '../models/userRequest.model';
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
    console.log(data);
    this.fire.collection("userRequest").add(data);
  }

  getRequest() {
    return this.fire.collection("userRequest").snapshotChanges();
  }

  get windowRef() {
    return window;
  }
}

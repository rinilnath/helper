import { Injectable } from '@angular/core';
import { UserRequest } from './userRequest.model';
import { AngularFirestore } from '@angular/fire/firestore';

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
}

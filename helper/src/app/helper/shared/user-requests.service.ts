import { Injectable } from '@angular/core';
import { UserRequest } from './userRequest.model';
import { AngularFirestore } from '@angular/fire/firestore/';

@Injectable({
  providedIn: 'root'
})
export class UserRequestsService {

  public userRequestFormData: UserRequest

  constructor() {
  }
}

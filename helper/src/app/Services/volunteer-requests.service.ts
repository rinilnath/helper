import { Injectable } from '@angular/core';
import { VolunteerRequest } from '../models/volunteerRequest.model';
import { AngularFirestore } from '@angular/fire/firestore';
import "firebase/firestore"
@Injectable({
  providedIn: 'root'
})
export class VolunteerRequestsService {

  public volunteerRequestFormData: VolunteerRequest;
  

  constructor(public fire: AngularFirestore) {
  }

  addRequest(data: any) {
    console.log(data);
    this.fire.collection("volunteerRequest").add(data);
  }

  getRequest() {
    return this.fire.collection("volunteerRequest").snapshotChanges();
  }

  get windowRef() {
    return window;
  }
}

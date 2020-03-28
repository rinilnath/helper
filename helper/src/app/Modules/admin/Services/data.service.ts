import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import "firebase/firestore"
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public fire: AngularFirestore) { }
  addLocalBody(uid,data) {
    return this.fire.collection("localbodies").doc(uid).set(data)
  }
  getUserData(uid){
    return this.fire.collection("localbodies").doc(uid).get()
  }
  addVolunteer(uid,data) {
    return this.fire.collection("volunteers").doc(uid).set(data)
  }
  getVolunteers(district,localbody){
    return this.fire.collection("volunteers",ref=>ref.where('district','==',district).where('localbody','==',localbody))
  }
}

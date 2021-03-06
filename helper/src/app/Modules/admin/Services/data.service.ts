import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import "firebase/firestore"
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public fire: AngularFirestore) { }
  addLocalBody(uid, data) {
    return this.fire.collection("localbodies").doc(uid).set(data)
  }
  getUserData(uid) {
    return this.fire.collection("localbodies").doc(uid).get()
  }

  addVolunteer(num, data) {
    return this.fire.collection("volunteers").doc("vol-" + num).set(data);
  }

  getVolunteers(district, localbody) {
    return this.fire.collection("volunteers", ref => ref.where('district', '==', district).where('localbody', '==', localbody))
  }

  getRequest(district, localbody) {
    return this.fire.collection("userRequest", ref => ref.where('district', '==', district).where('taluk', '==', localbody))
  }

  getAllVolunteers(district, localbody) {
    return this.fire.collection("volunteers", ref => ref.where('district', '==', district).where('localbody', '==', localbody));
  }

  getVolunteerTaskList(uid) {
    return this.fire.collection("userRequest", ref => ref.where('volunteerId', '==', uid)).snapshotChanges()
  }

  getVolunteer(uid) {
    return this.fire.collection("volunteers").doc(uid)
  }

  updateTaskStatus(data) {
    return this.fire.collection("userRequest").doc(data.id).set(data)
  }

  updateVolunteerInUser(data) {
    return this.fire.collection("userRequest").doc(data.id).set(data)
  }

  updateUserInVolunteer(data) {
    return this.fire.collection("volunteers").doc(data.id).set(data)
  }

  updateVolunteer(uid, data) {
    return this.fire.collection("volunteers").doc(uid).set(data)
  }

  deleteVolunteer(data) {
    return this.fire.collection("volunteers").doc(data.id).delete()
  }

  restPassword(uid, passwordData) {
    return this.fire.doc("volunteers/" + uid).update({
      password: passwordData
    })
  }

}

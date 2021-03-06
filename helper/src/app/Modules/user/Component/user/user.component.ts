import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRequestsService } from '../../Services/user-requests.service';

import * as firebase from 'firebase'

declare var $: any;

// export class PhoneNumber {
//   phoneNumber: string;
//   // format phone numbers as E.164
//   get e164() {
//     const num = '91' + this.phoneNumber
//     return `+${num}`
//   }

// }

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  trackingNumber: string = "";
  userDetails;
  list;
  localBodies;
  districtname;
  place;

  windowRef: any;
  // phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;

  constructor(public userRequest: UserRequestsService, ) {
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
    });

    let temp = new Set();
    let places = new Set();
    // this.windowRef = this.userRequest.windowRef;
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    // this.windowRef.recaptchaVerifier.render();
    this.resetForm();
    this.userRequest.getLocalBodies().valueChanges().subscribe(res => {
      this.localBodies = res
      this.localBodies.forEach(function (value) {
        temp.add(value.district.toLowerCase());
        places.add(value.name.toLowerCase())
      });
    });
    this.districtname = temp;
    this.place = places;
  }

  // sendLoginCode() {   

  //   const appVerifier = this.windowRef.recaptchaVerifier;

  //   this.phoneNumber.phoneNumber = this.userRequest.userRequestFormData.mobile;

  //   const num = this.phoneNumber.e164;

  //   this.getRequest(this.userRequest.userRequestFormData.mobile).subscribe(res => this.list = res);

  //   firebase.auth().signInWithPhoneNumber(num, appVerifier)
  //     .then(result => {

  //       this.windowRef.confirmationResult = result;

  //     })
  //     .catch(error => console.log(error));
  // }

  // verifyLoginCode() {
  //   // fetching db request for varification of mobile number 
  //   this.windowRef.confirmationResult
  //     .confirm(this.verificationCode)
  //     .then(result => {

  //       this.user = result.user;

  //     })
  //     .catch(error => alert("Incorrect code entered?"));
  // }

  onSubmitNumber() {
    let num = this.trackingNumber;
    if (num.length == 10) {
      this.getRequest(num).subscribe(res => this.userDetails = res);
    }
  }

  getRequest(num) {
    return this.userRequest.getRequest(num).valueChanges()
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    let req;
    let flag = false;
    let flag2 = false;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    data.date = mm + '/' + dd + '/' + yyyy;
    data.description = "";
    
    if (false) {//this.user == undefined) {
      alert("Mobile Number not verified")
    } else {
      if (form.valid) {
        this.getRequest(this.userRequest.userRequestFormData.mobile).subscribe(res => {
          req = res;
          req.forEach(function (values) {
            if (values.mobile == data.mobile) {
              flag = true
              if(values.status == 'Done')
                flag = false
              else if(values.status == 'Cancelled')
                flag = false
            }
          });
          if (flag && !flag2) {
            $('.modal-body').html("<p>Already a request is pending in this number</p><p>Please wait till get it resolved</p>");
            $('#myModal').modal('show');
          }
          if (!flag && !flag2) {
            flag2 = true;
            data.status = "Submitted";
            this.userRequest.addRequest(data);
            $('.modal-body').html("<p>Your request submitted successfully</p><p>We will contact you soon</p>");
            $('#myModal').modal('show');
            this.resetForm(form);
          }
        });
      } else {
        alert("inputs not valid")
      }
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.userRequest.userRequestFormData = {
      id: "",
      username: "",
      email: "",
      mobile: "",
      district: "",
      taluk: "",
      village: "",
      address: "",
      requiredItem: "",
      status: "",
      volunteerId: "",
      comment: "",
      date : "",
      description : ""
    }
  }
}

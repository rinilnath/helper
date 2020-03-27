import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRequestsService } from 'src/app/Services/user-requests.service';
import { UserRequest } from 'src/app/Services/userRequest.model';
import { districts } from '../../Services/geographyDetails'
import { villages } from '../../Services/geographyDetails'
import { taluks } from '../../Services/geographyDetails'

import * as firebase from 'firebase'
declare var $: any;

export class PhoneNumber {
  phoneNumber: string;
  // format phone numbers as E.164
  get e164() {
    const num = '91' + this.phoneNumber
    return `+${num}`
  }

}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  trackingNumber: string;

  userDetails;

  list: UserRequest[];

  districtlist = districts;
  villagelist = villages;
  taluklist = taluks;

  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;

  constructor(public userRequest: UserRequestsService) {

  }


  ngOnInit(): void {
    this.windowRef = this.userRequest.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
    this.resetForm();
    this.userRequest.getRequest().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ... (item.payload.doc.data()) as UserRequest
        }
      })
    });
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    this.phoneNumber.phoneNumber = this.userRequest.userRequestFormData.mobile;

    const num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {

        this.windowRef.confirmationResult = result;

      })
      .catch(error => console.log(error));
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {

        this.user = result.user;

      })
      .catch(error => alert("Incorrect code entered?"));
  }

  onSubmitNumber() {
    let num = this.trackingNumber;
    let userdet = [];
    this.list.forEach(function (value) {
      if (num == value.mobile) {
        userdet.push(value);
      }
    });
    this.userDetails = userdet;
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    let flag = false;
    this.list.forEach(function (value) {
      if (value.mobile == data.mobile) {
        flag = true;
      }
    });
    
    if (this.user == undefined) {
      alert("Mobile Number not verified")
    } else {
      if (form.valid) {
        if (flag) {
          $('.modal-body').html("<p>Already a request is pending in this number</p><p>Please wait till get it resolved</p>");
          $('#myModal').modal('show');
        } else {
          data.status = "submitted";
          console.log(data);
          this.userRequest.addRequest(data);
          $('.modal-body').html("<p>Your request submitted successfully</p><p>We will contact you soon</p>");
          $('#myModal').modal('show');
          this.resetForm(form);
        }
      } else {
        alert("inputs not valid")
      }
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.userRequest.userRequestFormData = {
      username: "",
      email: "",
      mobile: "",
      district: "",
      taluk: "",
      village: "",
      address: "",
      requiredItem: "",
      status: ""
    }
  }
}

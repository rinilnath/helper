import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { VolunteerRequestsService } from 'src/app/Services/volunteer-requests.service';
import { VolunteerRequest } from 'src/app/models/volunteerRequest.model';
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
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {

  trackingNumber: string;

  userDetails;

  list: VolunteerRequest[];

  districtlist = districts;
  villagelist = villages;
  taluklist = taluks;

  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;

  constructor(public volunteerRequest: VolunteerRequestsService) {

  }


  ngOnInit(): void {
    this.windowRef = this.volunteerRequest.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
    this.resetForm();
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    this.phoneNumber.phoneNumber = this.volunteerRequest.volunteerRequestFormData.mobile;

    const num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {

        this.windowRef.confirmationResult = result;

      })
      .catch(error => console.log(error));
  }

  verifyLoginCode() {
    // fetching db request for varification of mobile number    
    this.getRequest();
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
    this.getRequest();
    this.list.forEach(function (value) {
      if (num == value.mobile) {
        userdet.push(value);
      }
    });
    this.userDetails = userdet;
  }

  getRequest() {
    this.volunteerRequest.getRequest().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ... (item.payload.doc.data()) as VolunteerRequest
        }
      })
    });
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    let flag = false;
    if (this.user == undefined) {
      alert("Mobile Number not verified")
    } else {
      if (form.valid) {
        this.list.forEach(function (value) {
          if (value.mobile == data.mobile) {
            flag = true;
          }
        });
        if (flag) {
          $('.modal-body').html("<p>Already a request is pending in this number</p><p>Please wait till get it resolved</p>");
          $('#myModal').modal('show');
        } else {
          data.status = "submitted";
          console.log(data);
          this.volunteerRequest.addRequest(data);
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
    this.volunteerRequest.volunteerRequestFormData = {
      category: "",
      username: "",
      mobile: "",
      email: "",
      dob: "",
      district: "",
      taluk: "",
      village: "",
      address: "",
      qualification: "",
      ocupation: ""
    }
  }
}
